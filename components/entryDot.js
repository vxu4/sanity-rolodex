class entryDot extends HTMLElement {
  static get observedAttributes() {
    return ["prompt", "color", "curatorialText", "contributorNames", "dates"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.attachEvents();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.isConnected) {
      this.shadowRoot.innerHTML = "";
      this.render();
      this.attachEvents();
    }
  }

  render() {
    const prompt = this.getAttribute("prompt");

    const template = document.createElement("template");

    template.innerHTML = `
  <style>
      .body-text {
        font-family: "Noto Sans", sans-serif;
        font-optical-sizing: auto;
        font-weight: 200;
        font-size: 14px;
        font-style: normal;
        font-variation-settings: "wdth" 100;
        color: black;
      }
      /* Entry overlay: w/ prompt and dot to click in */
      #entry-overlay {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: fixed;
        z-index: 888;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        overflow: auto;
        background-color: rgba(247, 247, 237, 0.95);
        opacity: 1; /* Fully visible */
        transition: opacity 1.5s ease; /* Smooth fade-out effect */
      }
      .hidden-entry-overlay {
        opacity: 0 !important;
        pointer-events: none; /* Prevent interaction */
        transition: opacity 1s ease;
      }
      .prompt-text {
        font-family: "Noto Sans", sans-serif;
        font-optical-sizing: auto;
        font-weight: 300;
        font-size: 15px;
        font-style: normal;
        font-variation-settings: "wdth" 87.5;
        color: black;
      }
      #entry-dot {
        width: 15px;
        height: 15px;
        background-color: transparent;
        border: 1px solid black;
        border-radius: 50%;
        cursor: pointer;
        transition: background-color 0.5s ease; /* Smooth fade-out effect */
      }
      #prompt {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: opacity 1s ease;
      }
      #loading {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100vw;
        transition: opacity 1s ease;
      }
      .loader-container {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .pulsing-circle {
        width: 15px;
        height: 15px;
        background-color: #595959;
        border-radius: 50%;
        animation: pulse 2.5s infinite;
      }
      @keyframes pulse {
        0%,
        100% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.5);
          opacity: 0.5;
        }
      }
    </style>
        <div id="entry-overlay" class="">
      <div id="prompt" class="hidden-entry-overlay">
        <p class="prompt-text body-text">${prompt}</p>
        <div id="entry-dot"></div>
      </div>
      <div id="loading">
        <p class="body-text">Loading ...</p>
        <div class="loader-container">
          <div class="pulsing-circle"></div>
        </div>
      </div>
    </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  attachEvents() {
    // Entry overlay
    const entryOverlay = this.shadowRoot.getElementById("entry-overlay");
    const entryDot = this.shadowRoot.getElementById("entry-dot");
    const promptContainer = this.shadowRoot.getElementById("prompt");
    const loadingText = this.shadowRoot.getElementById("loading");

    const color = this.getAttribute("color") || "rgba(0,0,0,0)";
    // window.addEventListener("load", () => {
    // Hide loading text once loading is complete
    //TODO: see if this works or if we need to somehow detect a change in loading state of parent...
    // if (prompt !== "") {
    if (this.getAttribute("prompt")) {
      loadingText.classList.add("hidden-entry-overlay");
      promptContainer.classList.remove("hidden-entry-overlay");
    }

    // }

    // Hover color change
    entryDot.addEventListener("mouseover", () => {
      //TODO: load this color from bg
      entryDot.style.backgroundColor = color;
    });
    entryDot.addEventListener("mouseout", () => {
      entryDot.style.backgroundColor = "transparent";
    });
    entryDot.addEventListener("click", () => {
      entryOverlay.classList.add("hidden-entry-overlay");
    });
    // });
  }
}

customElements.define("entry-dot", entryDot);
