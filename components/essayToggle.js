// HOW TO USE: 

// HTML:
//   <script src="/components/essayToggle.js" defer></script>
//   <essay-toggle></essay-toggle>

// JAVA SCRIPT:
// const toggle = document.querySelector("essay-toggle");
//   toggle.addEventListener("toggle-change", (event) => {
//    custom logic here
//   });


class EssayToggle extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: "Noto Sans", sans-serif;
          font-optical-sizing: auto;
          font-weight: 300;
          font-size: 13px;
          font-style: normal;
          font-variation-settings: "wdth" 87.5;
        }

        .toggle {
          display: flex;
          flex-direction: row;
          align-items: center;
          position: absolute;
          z-index: 99;
          right: 1rem;
          top: 1rem;
        }

        p {
          margin: 0;
          white-space: nowrap;
        }

        .italic {
          font-style: italic;
        }

        .switch {
          position: relative;
          display: inline-block;
          flex-shrink: 0;
          width: 2rem;
          height: 0.9rem;
          margin: 0 0.4rem;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--light-grey, grey);
          transition: 0.4s;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 0.7rem;
          width: 0.7rem;
          left: 0.1rem;
          bottom: 0.1rem;
          background-color: var(--white, white);
          transition: 0.4s;
        }

        input:checked + .slider {
          background-color: var(--light-grey, grey);
        }

        input:focus-visible + .slider {
          outline: 1px solid var(--light-grey, grey);
          outline-offset: 2px;
        }

        input:checked + .slider:before {
          transform: translateX(1.1rem);
        }

        .slider.round {
          border-radius: 34px;
        }

        .slider.round:before {
          border-radius: 50%;
        }
      </style>

      <div class="toggle">
        <p class="toggle-label-interactive italic">
          interactive read
        </p>

        <label class="switch">
          <input type="checkbox" aria-label="Switch between interactive read and full essay" />
          <span class="slider round"></span>
        </label>

        <p class="toggle-label-essay">
          full essay
        </p>
      </div>
    `;

        this.input = shadow.querySelector("input");
        this.interactiveText = shadow.querySelector(".toggle-label-interactive");
        this.essayText = shadow.querySelector(".toggle-label-essay");

        this.input.addEventListener("change", () => {
            const fullEssay = this.input.checked;

            this.interactiveText.classList.toggle("italic", !fullEssay);
            this.essayText.classList.toggle("italic", fullEssay);

            this.dispatchEvent(
                new CustomEvent("toggle-change", {
                    bubbles: true,
                    composed: true,
                    detail: { fullEssay }
                })
            );
        });
    }

    get checked() {
        return this.input.checked;
    }

    set checked(value) {
        this.input.checked = Boolean(value);
        this.interactiveText.classList.toggle("italic", !this.input.checked);
        this.essayText.classList.toggle("italic", this.input.checked);
    }
}

if (!customElements.get("essay-toggle")) {
    customElements.define("essay-toggle", EssayToggle);
}
