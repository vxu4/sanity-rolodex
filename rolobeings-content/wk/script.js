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
  video[]{
    "videoUrl": asset->url
  },
  slug
}`);

// Change the date in your URL string to this:
const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

let images = null;

// 4. Render the data onto your webpage
// FROM WIX CODE

// Fetch the data when the page loads
async function fetchStories() {
  try {
    const response = await fetch(URL);
    const { result } = await response.json();

    document.title = `${result.name}'s Project`;
    // document.getElementById("bg-video").src = result.video[0].videoUrl;

    const dotNav = document.getElementById("dotNav");
    const entryDot = document.getElementById("entryDot");

    dotNav.setAttribute("bioLabel", `${result.name}'s Bio`);
    dotNav.setAttribute("bioUrl", `/${result.initials}-bio`);
    dotNav.setAttribute("contentLabel", "Refresh Content");
    dotNav.setAttribute("contentUrl", `/${result.initials}`);
    dotNav.setAttribute("color", "white");

    entryDot.setAttribute("prompt", result.prompt);
    entryDot.setAttribute("color", result.color);

    document.images = result.images;

    displayStories(result);
  } catch (error) {
    console.error("Error fetching family stories:", error);
  }
}

// Attach event listeners after DOM loads
function displayStories(results) {
  const imgIdList = [
    "island-01",
    "island-02",
    "island-03",
    "1",
    "ref-01-A",
    "ref-01-B",
    "ref-01-C",
    "ref-01-D",
    "ref-01-E",
    "2",
    "ref-02-A",
    "ref-02-B",
    "ref-02-C",
    "ref-02-D",
    "ref-02-E",
    "3",
    "ref-03-A",
    "ref-03-B",
    "ref-03-C",
    "ref-03-D",
    "ref-03-E",
  ];

  for (let i = 0; i < results.images.length - 1; i++) {
    // document.getElementById(`fish-line-${i}`).src =
    //   results[0].images[i].imageUrl;
    document.getElementById(imgIdList[i]).src = results.images[i].imageUrl;
  }

  const textIdList = [
    "proj-description",
    "island-01-caption",
    "island-02-caption",
    "island-03-caption",
  ];
  for (let i = 0; i < results.textFragments.length - 1; i++) {
    document.getElementById(textIdList[i]).innerHTML = results.textFragments[i];
  }
}

// Get the modal
var modal = document.getElementById("myModal");
var projDescription = document.getElementById("proj-description");
var origIsland01 = document.getElementById("island-01");
var origIsland02 = document.getElementById("island-02");
var origIsland03 = document.getElementById("island-03");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var island01 = document.getElementById("island-01");
var modalContent01 = document.getElementById("modal-content-01");
var island02 = document.getElementById("island-02");
var modalContent02 = document.getElementById("modal-content-02");
var island03 = document.getElementById("island-03");
var modalContent03 = document.getElementById("modal-content-03");

island01.onclick = function () {
  modalTrigger(1);
};

island02.onclick = function () {
  modalTrigger(2);
};

island03.onclick = function () {
  modalTrigger(3);
};

function modalTrigger(num) {
  modal.style.display = "block";
  if (num == 1) {
    modalContent01.style.display = "block";
  } else if (num == 2) {
    modalContent02.style.display = "block";
  } else if (num == 3) {
    modalContent03.style.display = "block";
  }
  projDescription.style.display = "none";
  origIsland01.style.display = "none";
  origIsland02.style.display = "none";
  origIsland03.style.display = "none";
}

// Make ref-images draggable stickers
var refImages = document.getElementsByClassName("ref-image");
for (let i = 0; i < refImages.length; i++) {
  dragElement(refImages[i]);
}

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }
  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
  modalContent01.style.display = "none";
  modalContent02.style.display = "none";
  modalContent03.style.display = "none";
  projDescription.style.display = "block";
  origIsland01.style.display = "block";
  origIsland02.style.display = "block";
  origIsland03.style.display = "block";
};

//Generate stickers based on which modal's sticker button is clicked
const stickerButtonA = document.getElementById("sticker-button-1");
stickerButtonA.addEventListener("click", function () {
  generateStickers(1);
});
const stickerButtonB = document.getElementById("sticker-button-2");
stickerButtonB.addEventListener("click", function () {
  generateStickers(2);
});
const stickerButtonC = document.getElementById("sticker-button-3");
stickerButtonC.addEventListener("click", function () {
  generateStickers(3);
});

// Generating stickers with button
function generateStickers(num) {
  executed = true;
  const stickersrcs = [images[0].src, images[1].src, images[2].src];
  const finaldots = document.querySelectorAll(".finaldots");
  const container = document.querySelector(".dot-container");
  // Create and append sticker
  const sticker = document.createElement("img");
  sticker.src = stickersrcs[num - 1];
  sticker.style.top = `${Math.random() * 100 - 15}%`;
  sticker.style.left = `${Math.random() * 100 - 15}%`;
  sticker.classList.add("sticker");
  sticker.style.display = "block";
  sticker.style.cursor = "pointer";
  sticker.className = "sticker";
  sticker.style.width = "15vw";

  //making sticker draggable
  dragElement(sticker);
  container.appendChild(sticker);
}

// Kick off the script
fetchStories();
