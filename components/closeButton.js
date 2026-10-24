
class CloseButton extends HTMLElement {
    static get observedAttributes() {
        return ["color"];
    }

    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = `
      <style>
        :host {
          display: block;
        }

        button {
          position: fixed;
          top: 1vh;
          right: 2vw;
          z-index: 9999;

          padding: 0;
          margin: 0;
          border: none;
          background: transparent;

          font-size: 40px;
          font-weight: 100;
          font-family: "Noto Sans", sans-serif;
          line-height: 1;

          cursor: pointer;
          transition: opacity 0.3s;
          
        }

        button:hover {
          opacity: 0.6;
        }
      </style>

      <button type="button" aria-label="Close modal">&times;</button>
    `;

        this.button = shadow.querySelector("button");

        this.button.addEventListener("click", () => {
            this.dispatchEvent(
                new CustomEvent("close", {
                    bubbles: true,
                    composed: true
                })
            );
        });

        this.updateColor();
    }

    attributeChangedCallback() {
        this.updateColor();
    }

    updateColor() {
        if (!this.button) return;

        const color = this.getAttribute("color");

        this.button.style.color =
            color === "white" ? "#fff" : "#000";
    }
}

if (!customElements.get("close-button")) {
    customElements.define("close-button", CloseButton);
}
