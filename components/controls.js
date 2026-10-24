/**
 * Dot controls component, to implement: 
 * - in the parent component set the next/prev actions like this, w/ prevSlide and nextSlide being functions defined in the parent element
    * const controls = document.getElementById("slideControls");
    * controls.prevAction = prevSlide;
    * controls.nextAction = nextSlide;
    * controls.prevDisabled = currentSlide === 0;
    * controls.nextDisabled = currentSlide === slides.length - 1;
**/


class DotControls extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.state = {
      prevDisabled: false,
      nextDisabled: false,
      pulse: true,
    };

    // Functions passed in by the parent
    this.prevAction = null;
    this.nextAction = null;
  }

  connectedCallback() {
    this.render();
    this.attachEvents();
    this.update();
  }

  render() {
    const template = document.createElement("template");

    template.innerHTML = `
      <style>
        .controls {
          position: absolute;
          top: 82%;
          left: 0;
          right: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          transform: translateY(-50%);
          z-index: 100;
          pointer-events: none;
        }

        .controls button {
          margin: 2rem;
          width: 15px;
          height: 15px;
          border: 1px solid black;
          border-radius: 50%;
          background: transparent;
          font-size: 0;
          cursor: pointer;
          pointer-events: all;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition:
            box-shadow 0.3s ease,
            transform 0.2s ease;
        }

        .controls button:disabled {
          opacity: 0;
          cursor: default;
          transform: none;
        }

        .controls button:active {
          transform: scale(1);
        }

        .controls button:hover:not(:disabled) {
          transform: scale(1.3);
        }

        .pulse {
          width: 120px;
          height: 120px;
          box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.4);
          border-radius: 50%;
          animation: pulseScale 2s infinite ease-in-out;
          transform-origin: center;
        }

        @keyframes pulseScale {
          0% {
            transform: scale(1);
            box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.2);
          }

          50% {
            transform: scale(1.2);
            box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.4);
          }

          100% {
            transform: scale(1);
            box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.2);
          }
        }

        .paused {
          animation-play-state: paused;
        }
      </style>

      <div class="controls">
        <button id="prevBtn"></button>
        <button id="nextBtn" class="pulse"></button>
      </div>
    `;

    this.shadowRoot.appendChild(
      template.content.cloneNode(true)
    );
  }

  attachEvents() {
    const prevBtn = this.shadowRoot.getElementById("prevBtn");
    const nextBtn = this.shadowRoot.getElementById("nextBtn");

    prevBtn.addEventListener("click", () => {
      if (prevBtn.disabled) return;

      if (typeof this.prevAction === "function") {
        this.prevAction();
      }
    });

    nextBtn.addEventListener("click", () => {
      if (nextBtn.disabled) return;

      nextBtn.classList.remove("pulse");

      if (typeof this.nextAction === "function") {
        this.nextAction();
      }
    });

    nextBtn.addEventListener("mouseenter", () => {
      if (!nextBtn.disabled) {
        nextBtn.classList.remove("pulse");
        nextBtn.classList.add("paused");
      }
    });
  }

  set prevDisabled(value) {
    this.state.prevDisabled = value;
    this.update();
  }

  get prevDisabled() {
    return this.state.prevDisabled;
  }

  set nextDisabled(value) {
    this.state.nextDisabled = value;
    this.update();
  }

  get nextDisabled() {
    return this.state.nextDisabled;
  }

  update() {
    const prevBtn = this.shadowRoot.getElementById("prevBtn");
    const nextBtn = this.shadowRoot.getElementById("nextBtn");

    prevBtn.disabled = this.state.prevDisabled;
    nextBtn.disabled = this.state.nextDisabled;

    // nextBtn.classList.toggle("pulse", this.state.pulse);
  }
}

customElements.define("dot-controls", DotControls);