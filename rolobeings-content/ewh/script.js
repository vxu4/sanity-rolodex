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
  slug
}`);

// Change the date in your URL string to this:
const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

const interactiveText = document.getElementsByClassName(
  "toggle-label-interactive",
)[0];
const essayText = document.getElementsByClassName("toggle-label-essay")[0];
// Define keywords and text arrays as in your original script
const keywords = [
  "cadets",
  "thermal print-out",
  "plastic foiled cakes",
  "fifteen minute cycle",
  "little canyon",
  "but if I could describe it to you somehow",
  "collaboration and concern",
  "superpowers",
  "scrambling for care",
  "And the sun rises, too.",
];
let text = [];
let hasClicked = false;

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

    for (let i = 0; i < result.textFragments.length; i++) {
      text.push(result.textFragments[i].split(/[~]/));
    }
  } catch (error) {
    console.error("Error fetching family stories:", error);
  }
}

window.onload = function () {
  //Toggle script code
  const inputEl = document.getElementById("myInput");
  let fullessay = false;
  // Trigger when input gets focus (selected)
  inputEl.addEventListener("click", onInputSelected);

  // Function to run when input is selected (focused)
  function onInputSelected() {
    fullessay = !fullessay;
    if (fullessay) {
      displayFullEssay();
      essayText.classList.add("italic");
      interactiveText.classList.remove("italic");
    } else {
      displayText();
      essayText.classList.remove("italic");
      interactiveText.classList.add("italic");
    }
  }
};

// Function to safely get element position relative to the container
function getElementPosition(element) {
  const rect = element.getBoundingClientRect();
  const container = document.getElementById("fullpiece");
  const containerRect = container.getBoundingClientRect();

  return {
    left: rect.left - containerRect.left,
    top: rect.top - containerRect.top,
    width: rect.width,
    height: rect.height,
  };
}

function displayKeywords() {
  const fullpiece = document.getElementById("fullpiece");

  // Clear existing keywords
  document.querySelectorAll(".keyword").forEach((el) => el.remove());

  if (fullpiece.offsetHeight === 0) {
    fullpiece.style.minHeight = "700px";
  }

  const containerRect = fullpiece.getBoundingClientRect();
  const containerWidth = containerRect.width;
  const containerHeight = containerRect.height;

  const centerXOffset = containerWidth * 0.1;
  const usableWidth = containerWidth * 0.8;
  const usedPositions = []; // Store placed keyword positions

  keywords.forEach((word) => {
    const span = document.createElement("span");
    span.textContent = word;
    span.className = "keyword";

    let attempts = 0;
    let isOverlapping = false;
    let randomX, randomY;

    do {
      isOverlapping = false;
      randomX = Math.floor(centerXOffset + Math.random() * usableWidth);
      randomY = Math.floor(Math.random() * (containerHeight - 50));

      // Check for overlap
      for (const pos of usedPositions) {
        const dx = Math.abs(pos.x - randomX);
        const dy = Math.abs(pos.y - randomY);
        if (dx < 80 && dy < 50) {
          // Adjust spacing as needed
          isOverlapping = true;
          break;
        }
      }

      attempts++;
    } while (isOverlapping && attempts < 50); // Limit attempts to avoid infinite loops

    usedPositions.push({ x: randomX, y: randomY });

    span.style.left = `${randomX}px`;
    span.style.top = `${randomY}px`;
    span.style.padding = "10px";

    fullpiece.appendChild(span);
  });

  // Remove keywords after delay
  setTimeout(() => {
    if (!hasClicked && !fullessay) {
      document.querySelectorAll(".keyword").forEach((span, index) => {
        setTimeout(() => {
          span.classList.add("fade-out");
          setTimeout(() => {
            if (span.parentNode) {
              span.parentNode.removeChild(span);
            }
          }, 500);
        }, index * 700);
      });
      setTimeout(displayText, 7000);
    }
  }, 3000);
}

// Original displayText function restored
function displayText() {
  const fullpiece = document.getElementById("fullpiece");
  fullpiece.innerHTML = ""; // Clear existing content

  let totalDelay = 0;
  let sentenceDuration = 4000; // How long each sentence stays visible (in ms)
  const transitionDuration = 800; // How long fade-out lasts (in ms)

  text.forEach((paragraphArray, index) => {
    // Create a paragraph container
    const paragraph = document.createElement("div");
    paragraph.className = "paragraph";

    paragraphArray.forEach((sentence, sentenceIndex) => {
      sentenceDuration = sentence.length * 300;
      // Create a span for each sentence
      const span = document.createElement("span");
      span.className = "sentence";
      span.textContent = sentence + " "; // Ensure spacing
      paragraph.appendChild(span);

      // Delay showing each sentence
      setTimeout(() => {
        span.classList.add("visible");

        // After some time, make it disappear while the next one appears
        setTimeout(() => {
          span.classList.remove("visible");
          span.classList.add("hidden");
        }, sentenceDuration); // Delay before fading out
      }, totalDelay);

      totalDelay += 5000; // Time before next sentence appears
    });

    fullpiece.appendChild(paragraph);

    // Add a spacer div after each paragraph (except the last one)
    if (index < text.length - 1) {
      const spacer = document.createElement("div");
      spacer.className = "paragraph-spacer";
      spacer.style.height = "40px"; // Explicit height for the gap
      fullpiece.appendChild(spacer);
    }
  });

  const sentences = document.getElementsByClassName("sentence");
  setTimeout(() => {
    // Loop through each sentence and apply the class
    for (let sentence of sentences) {
      sentence.classList.add("full-visible");
    }
  }, totalDelay);
}

// Modified displayFullEssay function
function displayFullEssay() {
  // hasClicked = true;
  const fullpiece = document.getElementById("fullpiece");
  fullpiece.innerHTML = "";

  // Ensure the container is tall enough
  fullpiece.style.minHeight = "fit-content";

  text.forEach((paragraphArray, index) => {
    const paragraph = document.createElement("div");
    paragraph.className = "paragraph full-visible";

    paragraphArray.forEach((sentence) => {
      const span = document.createElement("span");
      span.className = "sentence full-visible";
      span.textContent = sentence + " ";
      paragraph.appendChild(span);
    });

    fullpiece.appendChild(paragraph);

    // Add a spacer div after each paragraph (except the last one)
    if (index < text.length - 1) {
      const spacer = document.createElement("div");
      spacer.className = "paragraph-spacer";
      spacer.style.height = "40px"; // Explicit height for the gap
      fullpiece.appendChild(spacer);
    }
  });

  // Scroll to top to ensure visibility of the beginning
  window.scrollTo(0, 0);
}

// Initialize after DOM load
function initializeApp() {
  // Start the animation sequence if not clicked already
  setTimeout(() => {
    if (!hasClicked) {
      displayKeywords();
    }
  }, 1000);
}

// Use a safer approach to DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}

// Kick off the script
fetchStories();
