// Replace these with your actual IDs from manage.sanity.io
const PROJECT_ID = "vgbk3y5q";
const DATASET = "production";

// This is the "GROQ" query.
// It says: "Find the person, and give me their name, bio,
// and the specific URL for their portrait."
const QUERY = encodeURIComponent(`*[_type == "person"][0]{
  name,
  bio,
  "imageUrl": portrait.asset->url
}`);

// Change the date in your URL string to this:
const URL = `https://${PROJECT_ID}.api.sanity.io/v2026-05-12/data/query/${DATASET}?query=${QUERY}`;

async function loadBio() {
  try {
    const response = await fetch(URL);
    const { result } = await response.json();

    if (result) {
      renderBio(result);
    } else {
      document.getElementById("bio-container").innerHTML =
        "<p>No bio found.</p>";
    }
  } catch (error) {
    console.error("Error fetching from Sanity:", error);
    document.getElementById("bio-container").innerHTML =
      "<p>Error loading bio.</p>";
  }
}

function renderBio(person) {
  const container = document.getElementById("bio-container");

  // Use a Template Literal to build the card
  container.innerHTML = `
    <div class="bio-card">
      <img src="${person.imageUrl}?w=400&auto=format" alt="${person.name}" style="border-radius: 8px; max-width: 100%;">
      <h1>${person.name}</h1>
      <p>${person.bio}</p>
    </div>
  `;
}

loadBio();
