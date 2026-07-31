class dotNav extends HTMLElement {
  static get observedAttributes() {
    return ["color", "content-url", "bio-url", "content-label", "bio-label"];
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
    const color = this.getAttribute("color") || "#000";
    const contentLabel =
      this.getAttribute("content-label") || "Rolobeing Content";
    const bioLabel = this.getAttribute("bio-label") || "Rolobeing Bio";

    const template = document.createElement("template");

    template.innerHTML = `
      <style>
        .dot {
          height: 15px;
          width: 15px;
          border: 1px solid ${color};
          border-radius: 50%;
          cursor: pointer;
          position: absolute;
          z-index: 10;
        }

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
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(10%);
          background-color: black;
          color: white;
          padding: 5px 10px;
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
        }

        
        #dot2::after {
          content: "${bioLabel}";
          font-family: "Noto Sans", sans-serif;
          font-optical-sizing: auto;
          font-weight: 300;
          font-size: 10px;
          font-style: normal;
          font-variation-settings: "wdth" 100;
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-110%);
          background-color: black;
          color: white;
          padding: 5px 10px;
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
        }

        #dot3::after {
          content: "${contentLabel}";
          font-family: "Noto Sans", sans-serif;
          font-optical-sizing: auto;
          font-weight: 300;
          font-size: 10px;
          font-style: normal;
          font-variation-settings: "wdth" 100;
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(10%);
          background-color: black;
          color: white;
          padding: 5px 10px;
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
      </style>

      <div id="dot1" class="dot">        
      </div>

      <div id="dot2" class="dot">
      </div>

      <div id="dot3" class="dot">
      </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  attachEvents() {
    this.shadowRoot.getElementById("dot2").onclick = () => {
      window.location.href = this.getAttribute("bio-url");
    };

    this.shadowRoot.getElementById("dot3").onclick = () => {
      window.location.href = this.getAttribute("content-url");
    };

    this.shadowRoot.getElementById("dot1").onclick = () => {
      window.location.href = "/rolodex-home";
    };
  }
}

customElements.define("dot-nav", dotNav);
