class FadeScroll extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>

        :host {
        display: block;
        width: 100%;
        height: 100%;
        min-height: 0;
        min-width: 0;
        }

        .scroll-container {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        box-sizing: border-box;
        scrollbar-width: none;
        -ms-overflow-style: none;

        -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 15%,
            black 85%,
            transparent 100%
        );

        mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 15%,
            black 85%,
            transparent 100%
        );
        }

        .scroll-container::-webkit-scrollbar {
        display: none;
        }

        .content {
          box-sizing: border-box;
          min-height: 100%;
        }
      </style>

      <div class="scroll-container">
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define("fade-scroll", FadeScroll);