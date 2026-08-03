class entryDot extends HTMLElement {
  static get observedAttributes() {
    return [
      "prompt",
      "color",
      "curatorialText",
      "contributorNames",
      "dates",
      "loading",
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.state = {
      prompt: "",
      color: "rgba(0,0,0,0)",
      loading: true,
      overlayVisible: true,
    };
  }

  connectedCallback() {
    this.render();
    this.attachEvents();
    this.syncAttributes();
    this.update();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    this.syncAttributes();

    if (this.isConnected) {
      this.update();
    }
  }

  syncAttributes() {
    this.state.prompt = this.getAttribute("prompt") || "";
    this.state.color = this.getAttribute("color") || "rgba(0,0,0,0)";
    this.state.loading = this.getAttribute("loading") === "true";
  }

  render() {
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
          background-color: rgba(247,247,237,.95);
          transition: opacity 1s ease;
        }

        .hidden {
          opacity: 0;
          pointer-events: none;
        }

        .prompt-text {
          font-family: "Noto Sans", sans-serif;
          font-weight: 300;
          font-size: 15px;
          color: black;
        }

        #prompt {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: opacity 1s ease;
        }

        #entry-dot {
          width: 15px;
          height: 15px;
          border: 1px solid black;
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
          transition: background-color .4s ease;
        }

        #loading {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
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
          background: #595959;
          border-radius: 50%;
          animation: pulse 2.5s infinite;
        }

        @keyframes pulse {
          0%,100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: .5;
          }
        }

      </style>

      <div id="entry-overlay">

        <div id="prompt" class="hidden">
          <p
            id="prompt-text"
            class="prompt-text body-text">
          </p>

          <div id="entry-dot"></div>
        </div>

        <div id="loading">
          <p class="body-text">Loading...</p>

          <div class="loader-container">
            <div class="pulsing-circle"></div>
          </div>
        </div>

      </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  update() {
    const overlay = this.shadowRoot.getElementById("entry-overlay");

    const promptContainer = this.shadowRoot.getElementById("prompt");

    const promptText = this.shadowRoot.getElementById("prompt-text");

    const loading = this.shadowRoot.getElementById("loading");

    promptText.textContent = this.state.prompt;

    loading.classList.toggle("hidden", !this.state.loading);

    promptContainer.classList.toggle("hidden", this.state.loading);

    overlay.classList.toggle("hidden", !this.state.overlayVisible);
  }

  attachEvents() {
    const overlay = this.shadowRoot.getElementById("entry-overlay");

    const entryDot = this.shadowRoot.getElementById("entry-dot");

    entryDot.addEventListener("mouseover", () => {
      entryDot.style.backgroundColor = this.state.color;
    });

    entryDot.addEventListener("mouseout", () => {
      entryDot.style.backgroundColor = "transparent";
    });

    entryDot.addEventListener("click", () => {
      this.state.overlayVisible = false;
      this.update();
    });
  }
}

customElements.define("entry-dot", entryDot);
