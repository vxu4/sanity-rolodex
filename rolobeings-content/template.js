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

    displayStories(result);
  } catch (error) {
    console.error("Error fetching family stories:", error);
  }
}

// Attach event listeners after DOM loads
function displayStories(results) {
  for (let i = 0; i < results.images.length - 1; i++) {
    // document.getElementById(`fish-line-${i}`).src =
    //   results[0].images[i].imageUrl;
    if (i > 0) {
      //   document.getElementById(`full-essay-fish-${i}`).src =
      //     results[0].images[i].imageUrl;
    }
  }
}

// Kick off the script
fetchStories();
