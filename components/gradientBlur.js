
class GradientBlur extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
        <style>
          :host {
            position: fixed;
            z-index: 900;
            inset: auto 0 0 0;
            display: block;
            height: var(--gradient-blur-height, 50%);
            pointer-events: none;
            opacity: 1;
            transition: opacity 0.4s ease;
          }

          :host([hidden]) {
            display: none;
          }

          .layer,
          .blur-start,
          .blur-end {
            position: absolute;
            inset: 0;
          }

          .blur-start {
            z-index: 1;
            backdrop-filter: blur(0.5px);
            -webkit-backdrop-filter: blur(0.5px);
            mask: linear-gradient(to bottom,
              transparent 0%,
              black 12.5%,
              black 25%,
              transparent 37.5%);
          }

          .layer:nth-child(2) {
            z-index: 2;
            backdrop-filter: blur(1px);
            -webkit-backdrop-filter: blur(1px);
            mask: linear-gradient(to bottom,
              transparent 12.5%, black 25%,
              black 37.5%, transparent 50%);
          }

          .layer:nth-child(3) {
            z-index: 3;
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
            mask: linear-gradient(to bottom,
              transparent 25%, black 37.5%,
              black 50%, transparent 62.5%);
          }

          .layer:nth-child(4) {
            z-index: 4;
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            mask: linear-gradient(to bottom,
              transparent 37.5%, black 50%,
              black 62.5%, transparent 75%);
          }

          .layer:nth-child(5) {
            z-index: 5;
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            mask: linear-gradient(to bottom,
              transparent 50%, black 62.5%,
              black 75%, transparent 87.5%);
          }

          .layer:nth-child(6) {
            z-index: 6;
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            mask: linear-gradient(to bottom,
              transparent 62.5%, black 75%,
              black 87.5%, transparent 100%);
          }

          .layer:nth-child(7) {
            z-index: 7;
            backdrop-filter: blur(32px);
            -webkit-backdrop-filter: blur(32px);
            mask: linear-gradient(to bottom,
              transparent 75%, black 87.5%, black 100%);
          }

          .blur-end {
            z-index: 8;
            backdrop-filter: blur(64px);
            -webkit-backdrop-filter: blur(64px);
            mask: linear-gradient(to bottom,
              transparent 87.5%, black 100%);
          }

          @supports not (
            (backdrop-filter: blur(1px)) or
            (-webkit-backdrop-filter: blur(1px))
          ) {
            :host {
              display: none;
            }
          }
        </style>

        <div class="blur-start"></div>
        <div class="layer"></div>
        <div class="layer"></div>
        <div class="layer"></div>
        <div class="layer"></div>
        <div class="layer"></div>
        <div class="layer"></div>
        <div class="blur-end"></div>
      `;
    }
}

customElements.define("gradient-blur", GradientBlur);

