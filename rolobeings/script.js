// Replace these with your actual IDs from manage.sanity.io - vgbk3y5q
const PROJECT_ID = "vgbk3y5q";
const DATASET = "production";

// 2. The GROQ Query (Notice the -> which extracts the people's actual data)
const QUERY = encodeURIComponent(`*[_type == "bioEntry"]{
  title,
  content,
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
  } catch (error) {
    console.error("Error fetching family stories:", error);
  }
}

// 4. Render the data onto your webpage
function displayStories(stories) {
  const container = document.getElementById("bios-container"); // Make sure this ID exists in your HTML!
  if (!container) return;
  container.innerHTML = ""; // Clear out any loading text

  if (!stories || stories.length === 0) {
    container.innerHTML =
      "<p>No stories found yet. Go add some in your Sanity Studio!</p>";
    return;
  }

  stories.forEach((entry) => {
    // Loop through the array of people tagged in this specific story
    // If no one is tagged, default to an empty array so it doesn't crash
    const taggedPeople = entry.people || [];

    // Create the HTML for the little profile badges of everyone involved
    const peopleHtml = taggedPeople
      .filter((person) => person !== null) // Safety guard against broken references
      .map(
        (person) => `
      <div class="content-section">
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
    <div class="footer">
      <p class="footer-text">Biographical text and image courtesy of ${entry.title} © 2025</p>
    </div>
    `;
  });
}

// Kick off the script
fetchStories();
