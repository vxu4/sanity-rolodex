// Replace these with your actual IDs from manage.sanity.io - vgbk3y5q
const PROJECT_ID = "vgbk3y5q";
const DATASET = "production";

// 2. The GROQ Query (Notice the -> which extracts the people's actual data)
const QUERY = encodeURIComponent(`*[_type == "jv-content"]{
  name,
  initials,
  bioSlug,
  color,
  prompt,
  textFragments,
  images[]{
    "imageUrl": asset->url
  },
  slug
}`);

// Change the date in your URL string to this:
const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

// 4. Render the data onto your webpage
// function displayStories(stories) {
// const container = document.getElementById("bios-container"); // Make sure this ID exists in your HTML!
// if (!container) return;
// container.innerHTML = ""; // Clear out any loading text

// if (!stories || stories.length === 0) {
//   container.innerHTML =
//     "<p>No stories found yet. Go add some in your Sanity Studio!</p>";
//   return;
// }

// FROM WIX CODE
let fullessay = false;
let currentSlide = 0;
let slides = null;
let images = null;

// Entry overlay
var entryOverlay = document.getElementsByClassName("entry-overlay")[0];
const entryDot = document.getElementById("entry-dot");
entryDot.addEventListener("mouseover", () => {
  entryDot.style.backgroundColor = "#EB9514";
});
entryDot.addEventListener("mouseout", () => {
  entryDot.style.backgroundColor = "transparent";
});
entryDot.addEventListener("click", () => {
  entryOverlay.classList.add("hidden-entry-overlay");
});

const colors = [
  "#565147",
  "#501937",
  "#676E74",
  "#565147",
  "#2c3d27",
  "#356725",
  "#676E74",
  "#6B645C",
  "#501937",
  "#3a94a7",
  "#501937",
  "#a7893a",
  "#3a68a7",
  "#c81b28",
  "#dcdcdc",
];

const blobShapes = [
  "50% 50% 40% 60% / 60% 40% 50% 50%",
  "60% 40% 30% 70% / 70% 30% 60% 40%",
  "70% 30% 60% 40% / 30% 70% 40% 60%",
  "40% 60% 50% 50% / 60% 40% 70% 30%",
  "55% 45% 35% 65% / 65% 35% 55% 45%",
  "45% 55% 65% 35% / 35% 65% 45% 55%",
  "30% 70% 50% 50% / 70% 30% 60% 40%",
  "60% 40% 60% 40% / 40% 60% 40% 60%",
  "65% 35% 55% 45% / 45% 55% 35% 65%",
  "50% 50% 50% 50% / 50% 50% 50% 50%",
  "55% 45% 60% 40% / 60% 40% 55% 45%",
  "40% 60% 70% 30% / 70% 30% 40% 60%",
  "60% 50% 55% 45% / 45% 55% 50% 60%",
  "35% 65% 45% 55% / 55% 45% 65% 35%",
];

const promptText = document.getElementById("prompt-text");
const blob = document.getElementById("blob");
const slideText = document.getElementById("slide-text");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Pause animation on hover
nextBtn.addEventListener("mouseenter", () => {
  nextBtn.classList.add("paused");
});

// Fetch the data when the page loads
async function fetchStories() {
  try {
    const response = await fetch(URL);
    const { result } = await response.json();

    nav.setAttribute("color", result.color);
    nav.setAttribute("primary-label", `${result[0].name} Rolobeing Bio`);
    nav.setAttribute(
      "primary-url",
      `/rolobeings/rolobeings.html?id=$id=${result[0].initials}`,
    );
    nav.setAttribute("secondary-label", "Refresh Content");
    nav.setAttribute(
      "secondary-url",
      `/rolobeings-content/${result[0].initials}/${result[0].initials}.html`,
    );

    slides = result[0].textFragments;
    images = result[0].images;
    displayStories(result);
  } catch (error) {
    console.error("Error fetching family stories:", error);
  }
}

function updateFish() {
  const fishLayers = document.querySelectorAll("#fish-pngs .fish-layer");
  fishLayers.forEach((img, index) => {
    img.style.opacity = index <= currentSlide ? 1 : 0;
  });
}

function updateSlide() {
  blob.style.backgroundColor =
    colors[Math.min(currentSlide, colors.length - 1)];
  blob.style.borderRadius =
    blobShapes[Math.min(currentSlide, blobShapes.length - 1)];
  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === slides.length - 1;
  updateFish();
  const fish = document.getElementById("fish-pngs");

  const surroundFishImages = document.querySelectorAll(
    "#surrounding-fish .surround-fish",
  );

  if (slides[currentSlide] === "__FULL_ESSAY__" || fullessay == true) {
    document.getElementById("surrounding-fish").style.display = "block";
    surroundFishImages.forEach((img, index) => {
      setTimeout(() => {
        img.classList.add("visible");
      }, index * 100); // Staggered fade-in for a nice effect
    });
  } else {
    document.getElementById("surrounding-fish").style.display = "none";
    surroundFishImages.forEach((img) => img.classList.remove("visible"));
  }

  if (slides[currentSlide] === "__FULL_ESSAY__" || fullessay == true) {
    if (slides[currentSlide] === "__FULL_ESSAY__") {
      //Programatically trigger the switch if user reaches full essay through next buttons
      fullessay = !fullessay;
      document.getElementById("myInput").click();
      essayText.classList.add("italic");
      interactiveText.classList.remove("italic");
      //Reset slides and fullessay var
      currentSlide = 0;
    }

    blob.style.backgroundColor = "#dcdcdc";
    blob.style.borderRadius = "50%";
    blob.style.opacity = "0.2";
    fish.style.opacity = "0"; // fade out fish

    slideText.innerHTML = `
        <div class="full-essay-container">
            <p>${slides.slice(0, -1).join("</p><p>")}</p>
            <div style="text-align: center; margin-top: 1.5rem; position: relative;">
            <img src="https://static.wixstatic.com/media/7ec13e_c3caf04255b145b19190ececb5a590c1~mv2.png" 
                alt="full-fish" 
                style="
                    width: 220px; 
                    height: auto; 
                    opacity: 0.9; 
                    margin-top: -100px; /* Allows slight overlap */
                    margin-right: -70px
                " />
            </div>
        </div>
        `;
  } else {
    blob.style.backgroundColor = colors[currentSlide];
    blob.style.borderRadius = blobShapes[currentSlide];
    blob.style.opacity = "1";
    fish.style.opacity = "1"; // fade fish back in
    slideText.textContent = slides[currentSlide];
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    nextSlide();
  } else if (e.key === "ArrowLeft") {
    prevSlide();
  }
});

function nextSlide() {
  nextBtn.classList.remove("pulse");
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    updateSlide();
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlide();
  }
}

const interactiveText = document.getElementsByClassName(
  "toggle-label-interactive",
)[0];
const essayText = document.getElementsByClassName("toggle-label-essay")[0];

// Attach event listeners after DOM loads
function displayStories(results) {
  const inputEl = document.getElementById("myInput");
  const slides = results[0].textFragments;

  console.log(results);
  updateSlide();

  promptText.innerText = results[0].prompt;
  // Trigger when input gets focus (selected)
  inputEl.addEventListener("click", onInputSelected);

  // Function to run when input is selected (focused)
  function onInputSelected() {
    nextBtn.classList.remove("pulse");
    fullessay = !fullessay;
    updateSlide();
    if (fullessay) {
      essayText.classList.add("italic");
      interactiveText.classList.remove("italic");
      prevBtn.disabled = true;
      nextBtn.disabled = true;
    } else {
      essayText.classList.remove("italic");
      interactiveText.classList.add("italic");
      prevBtn.disabled = currentSlide === 0;
      nextBtn.disabled = currentSlide === slides.length - 1;
    }
  }
  console.log(results[0].images[0]);
  for (let i = 0; i < results[0].images.length - 1; i++) {
    document.getElementById(`fish-line-${i}`).src =
      results[0].images[i].imageUrl;
  }
}

// Kick off the script
fetchStories();
