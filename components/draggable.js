// Parent component: 
// use vw and vh units for positioning and sizing to ensure responsiveness across different screen sizes.
// .ref-image {
//   position: absolute;
//   top: 20vh;
//   left: 10vw;
//   width: 180px;
//   cursor: grab;
// }

// .ref-image:active {
//   cursor: grabbing;
// }

// .ref-image img {
//   display: block;
//   width: 100%;
//   height: auto;
// }
// <draggable-sticker class="ref-image">
//   <img src="/images/reference-1.jpg" alt="Reference image" />
// </draggable-sticker>

// <draggable-sticker class="ref-image">
//   <img src="/images/reference-2.jpg" alt="Reference image" />
// </draggable-sticker>


class Draggable extends HTMLElement {
    constructor() {
        super();

        this.dragging = false;
        this.pointerStartX = 0;
        this.pointerStartY = 0;
        this.startLeft = 0;
        this.startTop = 0;

        this.handlePointerDown = this.handlePointerDown.bind(this);
        this.handlePointerMove = this.handlePointerMove.bind(this);
        this.handlePointerUp = this.handlePointerUp.bind(this);
    }

    connectedCallback() {
        // Allow the parent to control positioning.
        // Only set defaults if the parent hasn't supplied them.
        if (getComputedStyle(this).position === "static") {
            this.style.position = "absolute";
        }

        this.style.touchAction = "none";
        this.style.cursor = "grab";

        this.addEventListener("pointerdown", this.handlePointerDown);
    }

    disconnectedCallback() {
        this.removeEventListener("pointerdown", this.handlePointerDown);
        this.removeEventListener("pointermove", this.handlePointerMove);
        this.removeEventListener("pointerup", this.handlePointerUp);
        this.removeEventListener("pointercancel", this.handlePointerUp);
    }

    handlePointerDown(event) {
        if (event.button !== 0) return;

        if (event.target.closest("a, button, input, textarea, select")) {
            return;
        }

        event.preventDefault();

        const rect = this.getBoundingClientRect();

        this.dragging = true;
        this.pointerStartX = event.clientX;
        this.pointerStartY = event.clientY;
        this.startLeft = rect.left;
        this.startTop = rect.top;

        // Detach this sticker from the Flexbox layout.
        this.style.position = "fixed";
        this.style.left = `${rect.left}px`;
        this.style.top = `${rect.top}px`;
        this.style.width = `${rect.width}px`;
        this.style.height = `${rect.height}px`;
        this.style.flex = "none";
        this.style.zIndex = "999";
        this.style.cursor = "grabbing";
        console.log(this);

        this.setPointerCapture(event.pointerId);

        this.addEventListener("pointermove", this.handlePointerMove);
        this.addEventListener("pointerup", this.handlePointerUp);
        this.addEventListener("pointercancel", this.handlePointerUp);


        if (this.hasAttribute("preserve-space")) {
            const placeholder = document.createElement("div");
            const styles = getComputedStyle(this);

            placeholder.style.width = `${rect.width}px`;
            placeholder.style.height = `${rect.height}px`;
            placeholder.style.flex = styles.flex;
            placeholder.style.flexBasis = styles.flexBasis;

            this.parentNode.insertBefore(placeholder, this);
            this._placeholder = placeholder;
        }
    }

    handlePointerMove(event) {
        if (!this.dragging) return;

        const dx = event.clientX - this.pointerStartX;
        const dy = event.clientY - this.pointerStartY;

        this.style.left = `${this.startLeft + dx}px`;
        this.style.top = `${this.startTop + dy}px`;
    }

    handlePointerUp() {
        this.dragging = false;
        this.style.cursor = "grab";

        this.removeEventListener("pointermove", this.handlePointerMove);
        this.removeEventListener("pointerup", this.handlePointerUp);
        this.removeEventListener("pointercancel", this.handlePointerUp);
    }
}

customElements.define("draggable-component", Draggable);