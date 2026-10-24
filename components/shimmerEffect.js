class ShimmerEffect extends HTMLElement {
    static get observedAttributes() {
        return ["active"];
    }

    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }

        ::slotted(*) {
          mask-image: linear-gradient(
            -75deg,
            rgba(0, 0, 0, 0.6) 30%,
            #000 50%,
            rgba(0, 0, 0, 0.6) 70%
          );

          -webkit-mask-image: linear-gradient(
            -75deg,
            rgba(0, 0, 0, 0.6) 30%,
            #000 50%,
            rgba(0, 0, 0, 0.6) 70%
          );

          mask-size: 200%;
          -webkit-mask-size: 200%;
        }

        :host([active]) ::slotted(*) {
          animation: shine 5s infinite;
        }

        @keyframes shine {
          from {
            -webkit-mask-position: 150%;
            mask-position: 150%;
          }

          to {
            -webkit-mask-position: -50%;
            mask-position: -50%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          :host([active]) ::slotted(*) {
            animation: none;
          }
        }
      </style>

      <slot></slot>
    `;
    }

    attributeChangedCallback() {
        // The CSS automatically responds to changes in "active".
    }
}

customElements.define("shimmer-effect", ShimmerEffect);