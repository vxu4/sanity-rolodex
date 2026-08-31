// Replace these with your actual IDs from manage.sanity.io - vgbk3y5q
const PROJECT_ID = "vgbk3y5q";
const DATASET = "production";

const slug = window.location.pathname.split("/").filter(Boolean)[0];

// 2. The GROQ Query (Notice the -> which extracts the people's actual data)
const QUERY =
    encodeURIComponent(`*[_type == "jv-content" && slug.current == "${slug}"][0]{
  name,
  initials,
  bioSlug,
  color,
  prompt,
  textFragments,
  images[]{
    "imageUrl": asset->url
  },
  slug,
  "herbData": archivedContent[]->{
    name,
    date,
    zodiac,
    color,
    text,
    image[]{
    "imageUrl": asset->url
  },
    caption,
    mapping,
    quotes
  }
}`);

// Change the date in your URL string to this:
const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

let herbData = null;
let selectedEssay;
let images = null;
let fullessay = false;

const interactiveText = document.getElementsByClassName(
    "toggle-label-interactive",
)[0];
const essayText =
    document.getElementsByClassName("toggle-label-essay")[0];

const imageStartPts = [
    { top: "380px", left: "50px" },
    { top: "731px", left: "109px" },
    { top: "634px", left: "119px" },
    { top: "623px", left: "218px" },
    { top: "673px", left: "408px" },
    { top: "695px", left: "794px" },
    { top: "712px", left: "1162px" },
    { top: "659px", left: "1253px" },
    { top: "702px", left: "1375px" },
    { top: "138px", left: "1019px" },
    { top: "213px", left: "873px" },
    { top: "215px", left: "584px" },
    { top: "259px", left: "582px" },
    { top: "258px", left: "808px" },
    { top: "490px", left: "571px" },
    { top: "334px", left: "580px" },
    { top: "259px", left: "650px" },
    { top: "259px", left: "639px" },
    { top: "333px", left: "801px" },
    { top: "421px", left: "803px" },
    { top: "490px", left: "633px" },
    { top: "413px", left: "725px" },
    { top: "407px", left: "650px" },
    { top: "335px", left: "652px" },
    { top: "333px", left: "727px" },
    { top: "332px", left: "650px" },
    { top: "334px", left: "728px" },
    { top: "494px", left: "725px" },
];
const imageCoordinates = [
    {
        topLowerlim: 205,
        topUpperLim: 215,
        leftLowerlim: 540,
        leftUpperlim: 550,
    },
    {
        topLowerlim: 205,
        topUpperLim: 215,
        leftLowerlim: 540,
        leftUpperlim: 550,
    },
    {
        topLowerlim: 555,
        topUpperLim: 565,
        leftLowerlim: 575,
        leftUpperlim: 585,
    },
    {
        topLowerlim: 325,
        topUpperLim: 335,
        leftLowerlim: 585,
        leftUpperlim: 595,
    },
    {
        topLowerlim: 400,
        topUpperLim: 410,
        leftLowerlim: 585,
        leftUpperlim: 595,
    },
    {
        topLowerlim: 465,
        topUpperLim: 475,
        leftLowerlim: 640,
        leftUpperlim: 650,
    },
    {
        topLowerlim: 405,
        topUpperLim: 415,
        leftLowerlim: 655,
        leftUpperlim: 665,
    },
    {
        topLowerlim: 245,
        topUpperLim: 255,
        leftLowerlim: 730,
        leftUpperlim: 740,
    },
    {
        topLowerlim: 395,
        topUpperLim: 405,
        leftLowerlim: 730,
        leftUpperlim: 740,
    },
    {
        topLowerlim: 480,
        topUpperLim: 490,
        leftLowerlim: 805,
        leftUpperlim: 815,
    },
    {
        topLowerlim: 335,
        topUpperLim: 345,
        leftLowerlim: 805,
        leftUpperlim: 815,
    },
];
const imgWidths = [
    68, 323, 85, 85, 183, 95, 101, 94, 91, 93, 61, 314, 77, 86, 79, 92, 165,
    94, 90, 88, 96, 93, 94, 93, 90, 95, 88, 95,
];
const interactiveView = document.getElementById("interactive-view");
const puzzleCanvas = document.getElementById("puzzle-canvas");
const quiltOutline = document.getElementById("quilt-outline");

const archiveView = document.getElementById("archive-view");
const herbDots = document.getElementsByClassName("herb-dot");
const herbTexts = document.getElementsByClassName("herb-text");
const herbDates = document.getElementsByClassName("herb-date");
// 4. Render the data onto your webpage
// FROM WIX CODE

// Fetch the data when the page loads
async function fetchStories() {
    try {
        const response = await fetch(URL);
        const { result } = await response.json();

        document.title = `${result.name}'s Project`;

        const dotNav = document.getElementById("dotNav");
        const entryDot = document.getElementById("entryDot");

        dotNav.setAttribute("bioLabel", `${result.name}'s Bio`);
        dotNav.setAttribute("bioUrl", `/${result.initials}-bio`);
        dotNav.setAttribute("contentLabel", "Refresh Content");
        dotNav.setAttribute("contentUrl", `/${result.initials}`);

        entryDot.setAttribute("prompt", result.prompt);
        entryDot.setAttribute("color", result.color);

        herbData = result.herbData;
        images = result.images;
        displayStories(result);
    } catch (error) {
        console.error("Error fetching family stories:", error);
    }
}

// =========================================================
// PUZZLE CANVAS SETTINGS
// =========================================================
//
// These dimensions define our internal coordinate system.
//
// IMPORTANT:
// Your imageStartPts and imageCoordinates arrays continue
// to use these coordinates. We do NOT convert them to vw/vh.
//

const PUZZLE_WIDTH = 1400;
const PUZZLE_HEIGHT = 850;


// =========================================================
// SCALE PUZZLE TO FIT SCREEN
// =========================================================

function scalePuzzle() {
    const availableWidth = window.innerWidth - 50;
    const availableHeight = window.innerHeight - 50;

    const scaleX = availableWidth / PUZZLE_WIDTH;
    const scaleY = availableHeight / PUZZLE_HEIGHT;

    const scale = Math.min(scaleX, scaleY);

    // Screen-space adjustment
    const puzzleXOffset = -30;
    const puzzleYOffset = 0;

    puzzleCanvas.style.transform = `
      translate(${puzzleXOffset}px, ${puzzleYOffset}px)
      scale(${scale})
    `;
}

// Scale the puzzle immediately
scalePuzzle();

// Recalculate whenever the browser window changes size
window.addEventListener("resize", scalePuzzle);

function showHerbInfo(i, show) {
    if (show) {
        herbDots[i].style.backgroundColor =
            herbData[i].color;

        herbTexts[i].classList.remove("invisible");
        herbDates[i].classList.remove("invisible");

        herbTexts[i].classList.add("visible");
        herbDates[i].classList.add("visible");
    } else {

        herbDots[i].style.backgroundColor = "transparent";

        herbTexts[i].classList.remove("visible");
        herbDates[i].classList.remove("visible");

        herbTexts[i].classList.add("invisible");
        herbDates[i].classList.add("invisible");
    }
}
let herb01counter = 0;
let herb02counter = 0;
let herb03counter = 0;
let herb04counter = 0;
let herb05counter = 0;
let currPiece = null;


function hideAndShow(j, both) {
    if (both) {
        document.getElementById(`herb-quote-0${j}-wrapper`).classList.remove("visible");

        // Wait for the fade-out to finish
        setTimeout(() => {
            // Change the text while invisible
            document.getElementById(`herb-quote-0${j}`).innerHTML = herbData[j - 1].quotes[getHerbCounter(j)];

            // Fade back in
            document.getElementById(`herb-quote-0${j}-wrapper`).classList.add("visible");
        }, 200);
    } else {
        //hide the quote for the herb
        document.getElementById(`herb-quote-0${j}-wrapper`).classList.remove("visible");
        document.getElementById(`herb-quote-0${j}`).innerHTML = "";
    }

}

function getHerbCounter(herbIndex) {
    switch (herbIndex) {
        case 1:
            return herb01counter;
        case 2:
            return herb02counter;
        case 3:
            return herb03counter;
        case 4:
            return herb04counter;
        case 5:
            return herb05counter;
    }
}


function showQuotes(type) {

    function incrementHerbCounter(herbIndex) {
        switch (herbIndex) {
            case 1:
                if (herb01counter < herbData[0].quotes.length) {
                    herb01counter++;
                } else {
                    herb01counter = 0;
                }
                break;
            case 2:
                if (herb02counter < herbData[1].quotes.length) {
                    herb02counter++;
                } else {
                    herb02counter = 0;
                }
                break;
            case 3:
                if (herb03counter < herbData[2].quotes.length) {
                    herb03counter++;
                } else {
                    herb03counter = 0;
                }
                break;
            case 4:
                if (herb04counter < herbData[3].quotes.length) {
                    herb04counter++;
                } else {
                    herb04counter = 0;
                }
                break;
            case 5:
                if (herb05counter < herbData[4].quotes.length) {
                    herb05counter++;
                } else {
                    herb05counter = 0;
                }
                break;
        }
    }

    // [ 2 ] R: 1, 2, 3, 4, 5
    // [ 2 ] BfT: 1, 2, 4, 5
    // [ 2 ] LfT: 3, 4, 5
    // [ 3 ] G: 2, 4
    // [ 1 ] S: 2
    if (type == "R") {
        //TODO: check if this is the right way to add onto an array, also if you even need to add to array (this would be for randomization)
        // quotesForDisplay.push(herbData[i].Rquotes);
        for (let j = 1; j < herbData.length + 1; j++) {

            hideAndShow(j, true);
            incrementHerbCounter(j);
        }
    }
    if (type == "BfT") {
        for (let j = 1; j < herbData.length + 1; j++) {
            if (j !== 3) {
                hideAndShow(j, true);
                incrementHerbCounter(j);
            } else {
                hideAndShow(j, false);
            }
        }
    }
    if (type == "LfT") {

        for (let j = 1; j < herbData.length + 1; j++) {
            if (j !== 1 && j !== 2) {
                hideAndShow(j, true);
                incrementHerbCounter(j);
            } else {
                hideAndShow(j, false);
            }
        }
    }
    if (type == "G") {
        for (let j = 1; j < herbData.length + 1; j++) {
            if (j !== 1 && j !== 3 && j !== 5) {
                hideAndShow(j, true);
                incrementHerbCounter(j);
            } else {
                hideAndShow(j, false);
            }
        }
    }
    if (type == "S") {
        for (let j = 1; j < herbData.length + 1; j++) {
            if (j !== 1 && j !== 3 && j !== 4 && j !== 5) {
                hideAndShow(j, true);
                incrementHerbCounter(j);
            } else {
                hideAndShow(j, false);
            }
        }
    }

}


// =========================================================
// POPULATE PUZZLE
// =========================================================

function populateScreen() {

    // Set the outline image
    quiltOutline.src = images[0].imageUrl;

    // Create all puzzle pieces
    for (let i = 1; i < images.length; i++) {

        const newPiece = `
      <img
        style="
          width: ${imgWidths[i - 1]}px;
          top: ${imageStartPts[i - 1].top};
          left: ${imageStartPts[i - 1].left};
        "
        src="${images[i].imageUrl}"
        alt="piece of the quilt to drag"
        id="piece-${i}"
        class="quilt-piece ${i < 11 ? "draggable" : "non-draggable"}"
      />
    `;

        puzzleCanvas.insertAdjacentHTML("beforeend", newPiece);
    }


    // =======================================================
    // MAKE PUZZLE PIECES DRAGGABLE
    // =======================================================

    const quiltPieces =
        document.getElementsByClassName("quilt-piece");

    for (let i = 0; i < quiltPieces.length; i++) {
        dragElement(quiltPieces[i]);
    }


    // =======================================================
    // HERB DOT HOVER FUNCTIONS
    // =======================================================

    for (let i = 0; i < herbDots.length; i++) {

        herbTexts[i].textContent = herbData[i].name;
        herbDates[i].textContent = herbData[i].date;


        herbDots[i].addEventListener("mouseover", () => {
            showHerbInfo(i, true);

        });


        herbDots[i].addEventListener("mouseout", () => {
            showHerbInfo(i, false);
        });
    }
}


// =========================================================
// MAKE PUZZLE PIECES DRAGGABLE
// =========================================================

function dragElement(elmnt) {

    let pos3 = 0;
    let pos4 = 0;


    // -------------------------------------------------------
    // START DRAG
    // -------------------------------------------------------

    function dragMouseDown(e) {

        e.preventDefault();

        // Record the mouse's starting position
        pos3 = e.clientX;
        pos4 = e.clientY;

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }


    // -------------------------------------------------------
    // DRAG
    // -------------------------------------------------------

    function elementDrag(e) {

        e.preventDefault();


        /*
         * The puzzle canvas may be visually scaled.
         *
         * For example:
         *
         *     1400px internal canvas
         *     ↓
         *     displayed at 1000px
         *
         * scale = 0.714
         *
         * Therefore a 71px mouse movement on screen actually
         * represents a 100px movement inside our puzzle's
         * coordinate system.
         */


        // Get the actual displayed size of the puzzle canvas
        const canvasRect = puzzleCanvas.getBoundingClientRect();

        // Calculate current scale from displayed size
        // compared with our internal coordinate system.
        const scaleX = canvasRect.width / PUZZLE_WIDTH;
        const scaleY = canvasRect.height / PUZZLE_HEIGHT;

        // They should be identical because we're using uniform
        // scaling, so use the average just to be safe.
        const scale = (scaleX + scaleY) / 2;


        // Calculate how far the mouse moved on screen
        const mouseDeltaX = e.clientX - pos3;
        const mouseDeltaY = e.clientY - pos4;


        // Convert screen movement into puzzle-coordinate movement
        const puzzleDeltaX = mouseDeltaX / scale;
        const puzzleDeltaY = mouseDeltaY / scale;


        // Get current puzzle-coordinate position
        const currentLeft = elmnt.offsetLeft;
        const currentTop = elmnt.offsetTop;


        // Calculate new puzzle-coordinate position
        const newLeft = currentLeft + puzzleDeltaX;
        const newTop = currentTop + puzzleDeltaY;


        // Move the piece
        elmnt.style.left = newLeft + "px";
        elmnt.style.top = newTop + "px";


        // Update mouse position for the next movement
        pos3 = e.clientX;
        pos4 = e.clientY;


        // -----------------------------------------------------
        // CHECK WHETHER PIECE IS IN THE CORRECT LOCATION
        // -----------------------------------------------------

        const pieceNumber =
            Number(elmnt.id.split("-")[1]);
        const limits = imageCoordinates[pieceNumber];
        const SNAP_TOLERANCE = 15;


        const isCorrectPosition =
            newTop >= limits.topLowerlim - SNAP_TOLERANCE &&
            newTop <= limits.topUpperLim + SNAP_TOLERANCE &&
            newLeft >= limits.leftLowerlim - SNAP_TOLERANCE &&
            newLeft <= limits.leftUpperlim + SNAP_TOLERANCE;

        if (isCorrectPosition) {
            const pieceNum = Number(elmnt.id.split("-")[1]);
            if ((pieceNum == 1 || pieceNum == 2) && pieceNum !== currPiece) {
                showQuotes("R");
            } else if ((pieceNum == 3 || pieceNum == 4 || pieceNum == 7) && pieceNum !== currPiece) {
                showQuotes("G");
            } else if (pieceNum == 5 && pieceNum !== currPiece) {
                showQuotes("BfT");
            } else if ((pieceNum == 6 || pieceNum == 8 || pieceNum == 10) && pieceNum !== currPiece) {
                showQuotes("LfT");
            } else if (pieceNum == 9 && pieceNum !== currPiece) {
                showQuotes("S");
            }
            currPiece = pieceNum;


            // // Snap to the center of the target range
            // const targetLeft =
            //   (limits.leftLowerlim + limits.leftUpperlim) / 2;

            // const targetTop =
            //   (limits.topLowerlim + limits.topUpperLim) / 2;

            // elmnt.style.left = `${targetLeft}px`;
            // elmnt.style.top = `${targetTop}px`;
        }

    }


    // -------------------------------------------------------
    // END DRAG
    // -------------------------------------------------------

    function closeDragElement() {

        document.onmouseup = null;
        document.onmousemove = null;
    }


    // Attach mouse event
    elmnt.onmousedown = dragMouseDown;
}



// =========================================================
// POPULATE ARCHIVE
// =========================================================
function populateArchive() {
    // make index on left from herb name, TODO: ensure in chronological order with most recent first
    const index = document.getElementById("archive-index");
    index.innerHTML = "";
    for (let i = 0; i < herbData.length; i++) {
        const title = `<p id="title-${i}" class="index-title subtitle">${herbData[i].name}</p>`;
        index.innerHTML += title;

    }
    for (let i = 0; i < herbData.length; i++) {
        document.getElementById(`title-${i}`).addEventListener("mouseover", () => {
            document.getElementById(`title-${i}`).classList.add("green-text");
        });
        document.getElementById(`title-${i}`).addEventListener("mouseout", () => {
            if (selectedEssay !== i) {
                document.getElementById(`title-${i}`).classList.remove("green-text");
            }
            // document.getElementsByClassName("green-text")[0]?.classList.remove("green-text");
        });
        document.getElementById(`title-${i}`).addEventListener("click", () => {
            document.getElementById(`title-${selectedEssay}`).classList.remove("green-text");
            document.getElementById(`title-${i}`).classList.add("green-text");
            selectEssay(i);
        });
    }
    selectEssay(0);
}



function selectEssay(num) {
    selectedEssay = num;
    if (!document.getElementById(`title-${num}`).classList.contains("green-text")) {
        document.getElementsByClassName("green-text")[0]?.classList.remove("green-text");
        document.getElementById(`title-${num}`).classList.add("green-text");
    }
    document.getElementById("herb-name").innerText = herbData[num].name;
    document.getElementById("title-img").src = herbData[num].image[0].imageUrl;
    document.getElementById("zodiac-season").innerHTML = herbData[num].zodiac;
    document.getElementById("publish-date").innerHTML = `First published ${herbData[num].date}`;

    const herbContent = document.getElementById("herb-content");
    herbContent.innerHTML = "";
    let textArrayNum = 0
    let imgArrayNum = 1
    let captionArrayNum = 0

    for (let i = 0; i < herbData[num].mapping.length; i += 2) {
        if (herbData[num].mapping[i] == "text") {
            for (let a = 0; a < herbData[num].mapping[i + 1]; a++) {
                herbContent.innerHTML += `<p class="body-text">${herbData[num].text[textArrayNum]}</p>`;
                textArrayNum++;
            }
        }
        if (herbData[num].mapping[i] == "image") {
            for (let b = 0; b < herbData[num].mapping[i + 1]; b++) {
                herbContent.innerHTML += `<img class="body-img" src=${herbData[num].image[imgArrayNum].imageUrl} />`;
                imgArrayNum++;
            }
        }
        if (herbData[num].mapping[i] == "caption") {
            for (let c = 0; c < herbData[num].mapping[i + 1]; c++) {
                herbContent.innerHTML += `<p class="caption-text">${herbData[num].caption[captionArrayNum]}</p>`;
                captionArrayNum++;
            }
        }
    }
}



// Attach event listeners after DOM loads
function displayStories(results) {

    const inputEl =
        document.getElementById("myInput");


    // -------------------------------------------------------
    // TOGGLE BETWEEN INTERACTIVE / ESSAY
    // -------------------------------------------------------

    inputEl.addEventListener("click", onInputSelected);


    function onInputSelected() {

        fullessay = !fullessay;

        if (fullessay) {

            essayText.classList.add("italic");
            interactiveText.classList.remove("italic");

            interactiveView.classList.remove("show");
            interactiveView.classList.add("hidden");

            populateArchive();

            archiveView.classList.remove("hidden");
            archiveView.classList.add("show");


        } else {

            essayText.classList.remove("italic");
            interactiveText.classList.add("italic");

            archiveView.classList.remove("show");
            archiveView.classList.add("hidden");

            interactiveView.classList.remove("hidden");
            interactiveView.classList.add("show");

            // Recalculate scale when returning to puzzle
            scalePuzzle();
        }
    }

    if (herbData !== null) {
        // -------------------------------------------------------
        // START PUZZLE
        // -------------------------------------------------------

        populateScreen();
    };

}

// Kick off the script
fetchStories();
