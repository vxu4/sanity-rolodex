
class CustomButton extends HTMLElement {
    static get observedAttributes() {
        return ["label"];
    }

    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }

        button {
          position: relative;
          padding: 0;
          border: none;
          background: transparent;

          font: inherit;
          color: inherit;
          cursor: pointer;
          transition: opacity 0.3s;

            background-color: rgba(255, 255, 255, 0.1);
      /* Semi-transparent white */
      border: 1px solid white;
      border-radius: 4px;
      color: var(--white);
      padding: 1vh 1vw;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 14px;
      cursor: pointer;
      width: 12vw;
      z-index: 999;
      font-family: "Noto Sans", sans-serif;
      font-optical-sizing: auto;
      font-weight: 300;
      font-size: 13px;
      font-style: italic;
      font-variation-settings: "wdth" 87.5;
        }

        button:hover {
          opacity: 0.6;
        }

        button:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: 4px;
        }
      </style>

      <button type="button"></button>
    `;

        this.button = shadow.querySelector("button");

        this.button.addEventListener("click", (event) => {
            this.dispatchEvent(
                new CustomEvent("button-click", {
                    bubbles: true,
                    composed: true,
                    detail: { originalEvent: event }
                })
            );
        });
    }

    connectedCallback() {
        this.updateLabel();
    }

    attributeChangedCallback() {
        this.updateLabel();
    }

    updateLabel() {
        if (this.button) {
            this.button.textContent = this.getAttribute("label") || "";
        }
    }
}

if (!customElements.get("custom-button")) {
    customElements.define("custom-button", CustomButton);
}
