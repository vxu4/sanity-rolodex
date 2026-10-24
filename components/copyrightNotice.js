// Should take in a prop that allows the user to pass in aft or rolodex, and you get back a different footer 

class CopyrightNotice extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const variant = this.getAttribute("variant") || "aft";

        const styles = `
            <style>
                :host {
                    display: inline-block;
                }

                a, p {
                    margin: 0;
                    text-decoration: none;
                    font-size: 14px;
                    padding: 0 2rem;
                    color: var(--black);
                }

                .aft {
                    font-family: "didot", serif;
                    font-style: italic;
                }

                .rolodex {
                    font-family: "Noto Sans", sans-serif;
                    font-style: italic;
                    font-weight: 200;
                    font-variation-settings: "wdth" 100;
                    transition: opacity 1s;
                }
            </style>
        `;

        let content;

        if (variant === "rolodex") {
            content = `
                <p class="rolodex">ROLODEX © 2019 . 2026</p>
            `;
        } else {
            content = `
                <a
                    class="aft"
                    href="https://www.aft.studio/"
                    target="_blank"
                    rel="noopener noreferrer"
                >© a.f.t. Cooperative</a>
            `;
        }

        this.shadowRoot.innerHTML = `${styles}${content}`;
    }
}

customElements.define("copyright-notice", CopyrightNotice);