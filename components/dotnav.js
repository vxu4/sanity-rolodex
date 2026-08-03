class dotNav extends HTMLElement {
  static get observedAttributes() {
    return ["color", "contentUrl", "bioUrl", "contentLabel", "bioLabel"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Internal state
    this.state = {
      color: "#000",
      contentUrl: "/",
      bioUrl: "/",
      contentLabel: "Rolobeing Project",
      bioLabel: "Rolobeing Bio",
    };
  }

  connectedCallback() {
    this.syncStateFromAttributes();
    this.render();
    this.attachEvents();
    this.update();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this.syncStateFromAttributes();

    if (this.isConnected) {
      this.update();
    }
  }

  syncStateFromAttributes() {
    Object.keys(this.state).forEach((key) => {
      const value = this.getAttribute(key);

      if (value !== null && value !== "") {
        this.state[key] = value;
      }
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .dot {
          height: 15px;
          width: 15px;
          border: 1px solid;
          border-radius: 50%;
          cursor: pointer;
          position: absolute;
          z-index: 10;
        }

        .tooltip {
          font-family: "Noto Sans", sans-serif;
          font-size: 10px;
          font-weight: 300;
          position: absolute;
          top: -20px;
          padding: 5px 10px;
          border-radius: 5px;
          white-space: nowrap;
          opacity: 0;
          transition: opacity .3s;
          pointer-events: none;
        }

        .dot:hover .tooltip {
          opacity: 1;
        }

        #dot1 {
          top:20px;
          left:50%;
          transform:translateX(-50%);
        }

        #dot2 {
          top:60px;
          left:calc(50% - 30px);
        }

        #dot3 {
          top:60px;
          left:calc(50% + 15px);
        }

        #dot1 .tooltip {
          left:50%;
          transform:translateX(10%);
        }

        #dot2 .tooltip {
          left:50%;
          transform:translateX(-110%);
        }

        #dot3 .tooltip {
          left:50%;
          transform:translateX(10%);
        }
      </style>

      <div id="dot1" class="dot">
        <span class="tooltip" id="homepage-tooltip">Rolodex Homepage</span>
      </div>

      <div id="dot2" class="dot">
        <span class="tooltip" id="bio-tooltip"></span>
      </div>

      <div id="dot3" class="dot">
        <span class="tooltip" id="content-tooltip"></span>
      </div>
    `;
  }

  update() {
    const dot1 = this.shadowRoot.getElementById("dot1");
    const dot2 = this.shadowRoot.getElementById("dot2");
    const dot3 = this.shadowRoot.getElementById("dot3");
    const tooltips = this.shadowRoot.querySelectorAll(".tooltip");
    console.log(tooltips);
    dot1.style.borderColor = this.state.color;
    dot2.style.borderColor = this.state.color;
    dot3.style.borderColor = this.state.color;

    for (let i = 0; i < tooltips.length; i++) {
      tooltips[i].style.backgroundColor =
        this.state.color == "white" ? "white" : "black";
      console.log(tooltips[i].style.backgroundColor);
      tooltips[i].style.color = this.state.color == "white" ? "black" : "white";
    }

    this.shadowRoot.getElementById("bio-tooltip").textContent =
      this.state.bioLabel;

    // this.shadowRoot.getElementById("bio-url").bioUrl = this.state.bioUrl;

    this.shadowRoot.getElementById("content-tooltip").textContent =
      this.state.contentLabel;

    // this.shadowRoot.getElementById("content-url").textContent =
    //   this.state.contentUrl;
    this.syncStateFromAttributes();
  }

  attachEvents() {
    this.shadowRoot.getElementById("dot2").onclick = () => {
      window.location.href = this.getAttribute("bioUrl");
    };

    this.shadowRoot.getElementById("dot3").onclick = () => {
      window.location.href = this.getAttribute("contentUrl");
    };

    this.shadowRoot.getElementById("dot1").onclick = () => {
      window.location.href = "/";
    };
  }
}

customElements.define("dot-nav", dotNav);
