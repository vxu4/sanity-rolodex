// create a navBar class, and clone the content of the template into it
class navBar extends HTMLElement {
  static get observedAttributes() {
    return ["rolobeingName", "color"];
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  addContent(color) {
    // create an HTML template element
    const template = document.createElement("template");
    template.innerHTML = `
        <style>
        /* Reset styles to prevent Wix conflicts */
        #rolodex-app * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            /* cursor: url(https://static.wixstatic.com/shapes/2fa7ac_08c6c66f706c472dac964e7c45491482.svg),
            auto; */
        }

        #rolodex-app {
            width: 100%;
            height: auto;
            min-height: 800px; /* Increased minimum height to show more content */
            position: relative;
            overflow: visible;
            display: flex;
            justify-content: center; /* Center horizontally */
            align-items: flex-start; /* Align to top */
        }

        .header {
            width: 100%;
            height: 100px;
            display: flex;
            justify-content: center;
            position: relative;
            padding: 20px;
        }

        .dot {
            position: absolute;
            height: 15px;
            width: 15px;
            background-color: transparent;
            border: 1px solid ${color};
            border-radius: 50%;
            /* cursor: url(https://static.wixstatic.com/shapes/2fa7ac_4b1d5c5c302f43509ef59d4190756e09.svg),
            pointer !important; */
            cursor: pointer;
            z-index: 10; /* Ensure dots are clickable */
        }

        /* Positioning the dots in a triangle formation */
        #dot1 {
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
        }

        #dot1::after {
            content: "Rolodex Homepage";
            font-family: "Noto Sans", sans-serif;
            font-optical-sizing: auto;
            font-weight: 300;
            font-size: 10px;
            font-style: normal;
            font-variation-settings: "wdth" 100;
            background-color:  ${color};
            color: white;
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(10%);
            padding: 2px 8px;
            border-radius: 5px;
            white-space: nowrap;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
            pointer-events: none;
            z-index: 15;
        }

        #dot1:hover::after {
            opacity: 1;
        }

        #dot2 {
            top: 60px;
            left: calc(50% - 30px);
            background-color: ${window.location.href.includes("bio") ? color : "transparent"};
            /* background-color: #f7f7ed; */
        }

        /* TODO: change name here */
        #dot2::after {
            content: "Rolobeing Bio";
            font-family: "Noto Sans", sans-serif;
            font-optical-sizing: auto;
            font-weight: 300;
            font-size: 10px;
            font-style: normal;
            font-variation-settings: "wdth" 100;
            background-color: ${color};
            color: white;
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-110%);
            padding: 2px 8px;
            border-radius: 5px;
            white-space: nowrap;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
            pointer-events: none;
            z-index: 15;
        }

        #dot2:hover::after {
            opacity: 1;
        }

        #dot3 {
            top: 60px;
            left: calc(50% + 15px);
            background-color: ${window.location.href.includes("bio") ? "transparent" : color};
        }

        #dot3::after {
            content: "Rolobeing Content";
            font-family: "Noto Sans", sans-serif;
            font-optical-sizing: auto;
            font-weight: 300;
            font-size: 10px;
            font-style: normal;
            font-variation-settings: "wdth" 100;
            background-color:  ${color};
            color: white;
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(10%);
            padding: 2px 8px;
            border-radius: 5px;
            white-space: nowrap;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
            pointer-events: none;
            z-index: 15;
        }

        #dot3:hover::after {
            opacity: 1;
        }

        .container {
            display: flex;
            flex-direction: column;
            width: 100%; /* Use full width */
            max-width: 100%; /* Remove max-width limit to use full available space */
            margin: 0 auto; /* Center the container */
            height: auto;
            min-height: 400px;
            position: relative;
            align-items: center; /* Center content horizontally */
        }
        </style>
    </head>
    <body>
        <main id="rolodex-app">
        <div class="container">
            <div class="header">
            <div class="dot" id="dot1" role="button"></div>
            <div class="dot" id="dot2" role="button"></div>
            <div class="dot" id="dot3" role="button"></div>
            </div>
        </div>
        </main>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // adding event listeners to the three dots of the navigation dot
  connectedCallback() {
    // console.log("hithit");
    // console.log(this.getAttribute("color"));
    // console.log(this.constructor.observedAttributes.color);

    this.addContent(this.getAttribute("color"));
    this.addLinks(this.getAttribute("name"));
  }

  addLinks(name) {
    this.shadowRoot.getElementById("dot1").addEventListener("click", (e) => {
      e.preventDefault();
      window.parent.location.href = "https://www.rolodex.cc/homepage";
    });
    this.shadowRoot.getElementById("dot2").addEventListener("click", (e) => {
      e.preventDefault();
      //TODO: EDIT BIO URL HERE
      // Navigate to bio page
      window.parent.location.href = `https://www.rolodex.cc/${rolobeingName}-bio`;
    });
    this.shadowRoot.getElementById("dot3").addEventListener("click", (e) => {
      e.preventDefault();
      //TODO: EDIT CONTENT PAGE URL HERE
      // Navigate to bio page
      window.parent.location.href = `https://www.rolodex.cc/${rolobeingName}`;
    });
  }
}
// define a custom element called 'nav-bar' using the navBar class
customElements.define("nav-bar", navBar);
