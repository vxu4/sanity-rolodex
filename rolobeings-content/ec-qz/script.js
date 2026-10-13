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
    for (let i = 2; i < results.images.length; i++) {
        document.getElementById(`img-${i}`).src = results.images[i].imageUrl;
    }
}

window.addEventListener("load", () => {
    // Opening animation, after click
    const firstElement = document.getElementById("opener");
    document.getElementById("entryDot").addEventListener("click", () => {
        setTimeout(firstScroll, 1500);
    });
    function firstScroll() {
        firstElement.classList.add("visible");
    }

    // PART 1: Scrolling animation for part 1's 13 lines
    // function debounce: helps prevent multiple scroll events from happening within a set time period
    function debounce(method, delay) {
        clearTimeout(method._tId);
        method._tId = setTimeout(function () {
            method();
        }, delay);
    }
    // funciton handleScroll: adds visible class to text elements in Pt 1, triggerin fade-in/up animation
    // for the first element and last element in pt 1 (other than opener), it only adds 1 instead of 2 elements
    function handleScroll() {
        document
            .getElementsByClassName("hidden-text")[1]
            .classList.add("visible");
    }

    //initiating debounce code, as well as Part 2 transitions
    document
        .getElementsByClassName("body")[0]
        .addEventListener("scroll", () => {
            debounce(handleScroll, 1000);
            const scrollY =
                document.getElementsByClassName("body")[0].scrollTop;
            let pt1_2 = 1050;
            let pt2_greenShimmer = 1500;
            let pt2_3 = 2500;
            let pt3_graphicDisappear = 3000;
            let pt3_biyiniao = 2900;
            let pt3_biyiniaoDisappear = 3250;

            if (window.innerWidth > 1279) {
                pt1_2 = 800;
                pt2_greenShimmer = 1200;
                pt2_3 = 2200;
                pt3_graphicDisappear = 2500;
                pt3_biyiniao = 2450;
                pt3_biyiniaoDisappear = 2800;
            } else if (window.innerWidth > 1919) {
                pt1_2 = 1000;
                pt2_greenShimmer = 1500;
                pt2_3 = 2400;
                pt3_graphicDisappear = 2850;
                pt3_biyiniao = 2800;
                pt3_biyiniaoDisappear = 3000;
            }
            if (scrollY > pt1_2) {
                // change bg image to yel
                // low horizon film
                document.getElementsByClassName("bg-2")[0].style.opacity = 1;
                // make part 2 visible
                document
                    .getElementsByClassName("part2-opener")[0]
                    .classList.add("visible");
                document
                    .getElementsByClassName("part2")[0]
                    .classList.add("visible");
                // fade out opacity gradient
                document
                    .getElementById("gradient-blur")
                    .classList.add("hidden");
                //make green text flash/sparkle
                document
                    .getElementsByClassName("green-text")[0]
                    .classList.add("effect-shine");
                document
                    .getElementsByClassName("green-text")[1]
                    .classList.add("effect-shine");
            }
            if (scrollY < pt1_2) {
                document.getElementsByClassName("bg-2")[0].style.opacity = 0;
                document
                    .getElementById("gradient-blur")
                    .classList.add("visible");
            }
            //remove green text flash/sparkle after scrolling down 200px within Pt 2
            if (scrollY > pt2_greenShimmer) {
                document
                    .getElementsByClassName("green-text")[0]
                    .classList.remove("effect-shine");
                document
                    .getElementsByClassName("green-text")[1]
                    .classList.remove("effect-shine");
            }
            // make graphic spiral visible for a 500px gap
            if (pt2_3 < scrollY || scrollY < pt3_graphicDisappear) {
                document
                    .getElementsByClassName("part3-A")[0]
                    .classList.add("visible");
            }
            // make graphic spiral invisible otherwise
            if (scrollY < pt2_3 || scrollY > pt3_graphicDisappear) {
                document
                    .getElementsByClassName("part3-A")[0]
                    .classList.remove("visible");
            }
            // make biyiniao visible after graphic spiral
            if (pt3_biyiniao < scrollY) {
                document
                    .getElementsByClassName("biyiniao")[0]
                    .classList.add("visible");
            }
            // make biyiniao invisible
            if (scrollY > pt3_biyiniaoDisappear || scrollY < pt3_biyiniao) {
                document
                    .getElementsByClassName("biyiniao")[0]
                    .classList.remove("visible");
            }
        });
});


// Kick off the script
fetchStories();
