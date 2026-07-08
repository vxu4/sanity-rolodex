class dotNav extends HTMLElement {
  static get observedAttributes() {
    return [
      "color",
      "primary-label",
      "primary-url",
      "secondary-label",
      "secondary-url",
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.attachEvents();
  }

  render() {
    const color = this.getAttribute("color") || "#000";

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
        }

        #dot1 {
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
        }

        #dot2 {
          top: 60px;
          left: calc(50% - 30px);
        }

        #dot3 {
          top: 60px;
          left: calc(50% + 15px);
        }

        .tooltip {
          opacity: 0;
          position: absolute;
          font-size: 10px;
          background: ${color};
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          white-space: nowrap;
          transform: translateY(-20px);
        }

        .dot:hover .tooltip {
          opacity: 1;
        }
      </style>

      <div id="dot1" class="dot">        
        <div class="tooltip">Rolodex Homepage</div>
      </div>

      <div id="dot2" class="dot">
        <div class="tooltip">${this.getAttribute("primary-label")}</div>
      </div>

      <div id="dot3" class="dot">
        <div class="tooltip">${this.getAttribute("secondary-label")}</div>
      </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  attachEvents() {
    const primaryUrl = this.getAttribute("primary-url");
    const secondaryUrl = this.getAttribute("secondary-url");

    this.shadowRoot.getElementById("dot2").onclick = () => {
      window.location.href = primaryUrl;
    };

    this.shadowRoot.getElementById("dot3").onclick = () => {
      window.location.href = secondaryUrl;
    };

    this.shadowRoot.getElementById("dot1").onclick = () => {
      window.location.href = "/rolodex-home";
    };
  }
}

customElements.define("dot-nav", dotNav);
