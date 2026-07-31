// Replace these with your actual IDs from manage.sanity.io - vgbk3y5q
const PROJECT_ID = "vgbk3y5q";
const DATASET = "production";

// Get slug from URL
const slug = window.location.pathname
  .split("/")
  .filter(Boolean)[0]
  .replace("-bio", "");

console.log("Current rolobeing:", slug);

const QUERY = encodeURIComponent(`
*[_type == "bioEntry" && slug.current == "${slug}"]{
  title,
  content,
  slug,
  "people": peopleInvolved[]->{
    name,
    quote,
    bio,
    "imageUrl": portrait.asset->url,
    "slug": slug.current
  }
}`);

// Change the date in your URL string to this:
const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

// 3. Fetch the data when the page loads
async function fetchStories() {
  try {
    const response = await fetch(URL);
    const { result } = await response.json();

    displayStories(result);
    console.log(result);
  } catch (error) {
    console.error("Error fetching family stories:", error);
  }
}

// 4. Render the data onto your webpage
function displayStories(stories) {
  document.title = `${stories[0].title}'s bio`;

  const dotNav = document.getElementById("dotNav");
  dotNav.setAttribute("contentUrl", `/${stories[0].slug.current}`);
  dotNav.setAttribute("contentLabel", "Rolobeing Content");
  dotNav.setAttribute("bioUrl", `/${stories[0].slug.current}-bio`);
  dotNav.setAttribute("bioLabel", "Rolobeing Bio");

  const container = document.getElementById("bios-container"); // Make sure this ID exists in your HTML!
  if (!container) return;
  container.innerHTML = ""; // Clear out any loading text

  if (!stories || stories.length === 0) {
    container.innerHTML =
      "<p>No stories found yet. Go add some in your Sanity Studio!</p>";
    return;
  }

  stories.forEach((entry) => {
    document.getElementById("footer-text").innerText =
      `Biographical text and image courtesy of ${entry.title} © 2025`;
    // Loop through the array of people tagged in this specific story
    // If no one is tagged, default to an empty array so it doesn't crash
    const taggedPeople = entry.people || [];

    // Create the HTML for the little profile badges of everyone involved
    const peopleHtml = taggedPeople
      .filter((person) => person !== null) // Safety guard against broken references
      .map(
        (person) => `
      <div class="content-section" style="width: ${stories.length > 1 ? "20vw" : "35vw"}">
        ${person.quote ? `<p>"${person.quote}"</p>` : ""}
        ${person.bio ? `<p>"${person.bio}"</p>` : ""}
        <img class="profile-pic" src="${person.imageUrl || "default-avatar.png"}" alt="${person.name}" />
      </div>
    `,
      )
      .join(""); // Merges the array of badges into one clean text block

    // Build the master card layout for the story
    // TODO: let year come from data backend too
    container.innerHTML += `
    <h1> ${entry.title} | a bio in parts </h1>
    <div class="content-section-wrapper">
      ${peopleHtml || "<em>No family members tagged</em>"}
    </div>
    `;
  });
}

// Kick off the script
fetchStories();
