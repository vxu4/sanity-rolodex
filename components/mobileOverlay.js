


class MobileOverlay extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
    <style>
      p {
        font-family: Arial, Helvetica, sans-serif;
      }

      body {
        margin: 0;
      }

      /* Mobile view only on screens up to 768px wide */
      .mobile-only {
        display: flex;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 999;
        position: absolute;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: var(--grey);
      }

      .redirect-message {
        color: var(--grey);
        text-align: center;
        font-family: "Noto Sans", sans-serif;
        font-optical-sizing: auto;
        font-weight: 200;
        font-size: 14px;
        font-style: normal;
        font-variation-settings: "wdth" 100;
      }

      .footer {
        position: absolute;
        bottom: 1.5rem;
        right: 0rem;
        display: flex;
        justify-content: right;
        align-items: end;
        flex-direction: column;
        width: 100%;
      }

      #copyright {
        font-family: "didot", serif;
        font-style: italic;
        text-decoration: none;
        font-size: 14px;
        color: var(--grey);
        padding: 0rem 2rem;
      }
    </style>
      <script src="/components/rolodexTitle.js"></script>
        <div class="mobile-only">
        <rolodex-title></rolodex-title>
      <div class="rolodex" id="alldots"> </div>

      <p class="redirect-message">
        the time is now
        <span class="clock" id="utcClock"> ... </span>
        <br />
        <br />
        we welcome you <br />
        to canon our truths <br />
        <br />

        with rite clear <br />
        <br />

        please visit rolodex.cc <br />
        curated for desktop platform <br />
        at this time <br />
      </p>
      <div class="footer">
        <a id="copyright" href="https://www.aft.studio/"
          >© a.f.t. Cooperative</a
        >
      </div>
    </div>
    `;
    }

    connectedCallback() {
        this.attachEvents();
    }


    attachEvents() {
        /**
         * Formats a number to always have two digits (e.g., 5 -> "05")
         */
        const padZero = (num) => num.toString().padStart(2, "0");

        /**
         * Updates the UTC clock every second
         */
        const updateUTCClock = () => {
            const clock = this.shadowRoot.querySelector("#utcClock");

            if (!clock) {
                console.warn("UTC clock element not found");
                return;
            }

            const now = new Date();
            const hours = padZero(now.getUTCHours());
            const minutes = padZero(now.getUTCMinutes());
            const seconds = padZero(now.getUTCSeconds());

            clock.textContent = `${hours}:${minutes}:${seconds} UTC`;
        };

        // Update immediately, then every second
        updateUTCClock();
        this._clockInterval = setInterval(updateUTCClock, 1000);
    }

    disconnectedCallback() {
        // Clean up the interval when the component is removed
        clearInterval(this._clockInterval);
    }

}

customElements.define("mobile-overlay", MobileOverlay);