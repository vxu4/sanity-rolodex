class ModalComponent extends HTMLElement {
    static get observedAttributes() {
        return ["open"];
    }

    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = `
      <style>
        :host {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 30;
          box-sizing: border-box;
        }

        :host([open]) {
          display: block;
          animation: fadein 0.3s;
        }

        .modal {
          position: absolute;
          inset: 0;
          overflow: auto;
          box-sizing: border-box;

          background-color: rgba(255, 255, 255, 0.35);
        }

        .content {
          position: relative;
          width: 100%;
        }

        @keyframes fadein {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          :host([open]) {
            animation: none;
          }
        }
      </style>

      <script src="/components/closeButton.js"></script>

      <div class="modal">
        <close-button class="close" color="white"></close-button>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;

        this._backdrop = shadow.querySelector(".modal");
        this._closeButton = shadow.querySelector(".close");

        shadow.querySelector("close-button").addEventListener("close", () => {
            this.closeModal();
        });

        this._backdrop.addEventListener("click", (event) => {
            event.stopPropagation();
            if (event.target === this._backdrop) {
                this.closeModal();
            }
        });

        this._handleKeydown = (event) => {
            if (event.key === "Escape" && this.hasAttribute("open")) {
                event.stopPropagation();

                this.closeModal();
            }
        };
    }

    connectedCallback() {
        document.addEventListener("keydown", this._handleKeydown);
    }

    disconnectedCallback() {
        document.removeEventListener("keydown", this._handleKeydown);
    }

    showModal() {
        this.setAttribute("open", "");
    }

    closeModal() {
        this.removeAttribute("open");

        this.dispatchEvent(
            new CustomEvent("modal-close", {
                bubbles: true,
                composed: true
            })
        );
    }
}

customElements.define("modal-component", ModalComponent);