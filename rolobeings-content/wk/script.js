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

    images = result.images;

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

  for (let i = 0; i < results.images.length; i++) {
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
  for (let i = 0; i < results.textFragments.length; i++) {
    document.getElementById(textIdList[i]).innerHTML = results.textFragments[i];
  }
}

// Get the modal
const modal = document.getElementById("island-modal");
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
  const dotNav = document.getElementById("dotNav");

  // modal.style.display = "block";
  modal.showModal();

  if (num == 1) {
    modalContent01.style.display = "block";
  } else if (num == 2) {
    modalContent02.style.display = "block";
  } else if (num == 3) {
    modalContent03.style.display = "block";
  }
  projDescription.style.display = "none";
  dotNav.style.display = "none";
  origIsland01.style.display = "none";
  origIsland02.style.display = "none";
  origIsland03.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
modal.addEventListener("modal-close", () => {
  document.getElementById("modal-content-01").style.display = "none";
  document.getElementById("modal-content-02").style.display = "none";
  document.getElementById("modal-content-03").style.display = "none";

  projDescription.style.display = "block";

  origIsland01.style.display = "block";
  origIsland02.style.display = "block";
  origIsland03.style.display = "block";
});

//Generate stickers based on which modal's sticker button is clicked
// const stickerButtonA = document.getElementById("sticker-button-1");
// stickerButtonA.addEventListener("click", function () {
//   generateStickers(1);
// });
// const stickerButtonB = document.getElementById("sticker-button-2");
// stickerButtonB.addEventListener("click", function () {
//   generateStickers(2);
// });
// const stickerButtonC = document.getElementById("sticker-button-3");
// stickerButtonC.addEventListener("click", function () {
//   generateStickers(3);
// });
document
  .getElementById("sticker-button-1")
  .addEventListener("button-click", () => {
    generateStickers(1);
  });

document
  .getElementById("sticker-button-2")
  .addEventListener("button-click", () => {
    generateStickers(2);
  });

document
  .getElementById("sticker-button-3")
  .addEventListener("button-click", () => {
    generateStickers(3);
  });

// Generating stickers with button
function generateStickers(num) {
  executed = true;
  const stickersrcs = [images[0].imageUrl, images[1].imageUrl, images[2].imageUrl];
  const container = document.querySelector(".dot-container");
  const sticker = document.createElement("img");
  sticker.src = stickersrcs[num - 1];
  sticker.classList.add("sticker");
  sticker.style.width = "15vw";
  sticker.style.display = "block";
  sticker.style.cursor = "pointer";

  const draggable = document.createElement("draggable-component");

  draggable.style.position = "absolute";
  draggable.style.top = `${Math.random() * 100 - 15}%`;
  draggable.style.left = `${Math.random() * 100 - 15}%`;

  draggable.appendChild(sticker);
  container.appendChild(draggable);
}

// Kick off the script
fetchStories();
