class RolodexTitle extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        // Track the animation state across clicks.
        this.hasGeneratedDots = false;
        this._eventsAttached = false;

        this.shadowRoot.innerHTML = `
        <style>
        .rolodex {
            color: var(--black);
            position: relative;
            cursor: pointer;
            text-align: center;
            font-family: "Marzo", serif;
            font-size: 2.5rem;
        }

        .solid-circle {
            position: relative;
            display: inline-block;
            width: 1.375rem;
            height: 1.375rem;
            border-radius: 50%;
            background-color: var(--black);
            transition:
            opacity 1s,
            transform 1.8s ease-in-out;
        }

        .finaldots {
        cursor: pointer;
        position: absolute;
        width: 1.375rem;
        height: 1.375rem;
        border-radius: 50%;
        background-color: var(--black);
        transition: transform 5s ease-in-out;
        }

        .o1 {
        /* top: 0; */
        /* left: 1.668rem;
            transform: translateX(-1.65rem); */
        /* left: 30px; */
        /* transform: translateX(-30); */
        transform: translateX(29px);
        /* transform: translateX(1.81rem); */
        }

        .o2 {
        /* bottom: 0; */
        /* left: -1.66rem;
            transform translateX(1.65rem); */
        /* left: -30px; */
        /* transform: translateX(30px); */
        transform: translateX(-29px);
        }

        .final-dot.clicked {
        background-color: #27000c;
        }

        .hide {
        display: none;
        }

        .hidden {
        opacity: 0;
        transition: opacity 1s;
        }

        .zIndex999 {
        z-index: 999;
        }

        /* .merged {
            transform: translateX(0);
        } */

        .dot {
        width: 1.375rem;
        height: 1.375rem;
        background-color: var(--black);
        border-radius: 50%;
        }

        .rolodex-dot {
        position: absolute;
        }

        /* Responsive adjustments */
        @media (max-width: 600px) {
            .rolodex {
                font-size: 2rem;
            }

            .o1 {
                left: 1.25rem;
                transform: translateX(-1.25rem);
            }

            .o2 {
                left: -1.25rem;
                transform: translateX(1.25rem);
            }

            .merged {
                transform: translateX(0);
            }
        }
        .justify-content-center {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 100%;
            }
        #beta-text {
            font-family: "Noto Sans", sans-serif;
            font-optical-sizing: auto;
            font-weight: 200;
            font-variation-settings: "wdth" 100;
            font-size: 14px;
            margin-top: 1rem;
        }
        .noto-sans-rolodex {
            font-family: "Noto Sans", sans-serif;
            font-optical-sizing: auto;
            font-weight: 300;
            font-style: normal;
            font-variation-settings: "wdth" 87.5;
        }
        </style>

        <div class="justify-content-center">
          <div class="rolodex noto-sans-rolodex" id="alldots">
            <span class="letter r"
              ><svg
                width="15"
                height="22"
                viewBox="0 0 15 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M-0.000195228 21.1499V1.0799C-0.000195228 0.779902 0.0998048 0.529902 0.299805 0.329902C0.519805 0.109901 0.769805 -9.89437e-05 1.0498 -9.89437e-05H7.82981C8.72981 -9.89437e-05 9.56981 0.169901 10.3498 0.509902C11.1298 0.849902 11.8098 1.3199 12.3898 1.9199C12.9698 2.4999 13.4298 3.1799 13.7698 3.9599C14.1098 4.7399 14.2798 5.5799 14.2798 6.4799C14.2798 7.3799 14.1098 8.2199 13.7698 8.9999C13.4298 9.7799 12.9698 10.4699 12.3898 11.0699C11.8098 11.6499 11.1298 12.1099 10.3498 12.4499C9.56981 12.7899 8.72981 12.9599 7.82981 12.9599H1.8898C1.7898 12.9599 1.7398 13.0099 1.7398 13.1099C1.7398 13.1699 1.7898 13.2299 1.8898 13.2899L13.9498 20.6699L13.6498 21.1499L1.5898 13.7699C1.4898 13.6899 1.3998 13.5999 1.3198 13.4999C1.2398 13.3999 1.1998 13.2699 1.1998 13.1099C1.1998 12.9099 1.2598 12.7499 1.3798 12.6299C1.5198 12.4899 1.6898 12.4199 1.8898 12.4199H7.82981C8.64981 12.4199 9.41981 12.2699 10.1398 11.9699C10.8598 11.6499 11.4798 11.2199 11.9998 10.6799C12.5398 10.1399 12.9598 9.5099 13.2598 8.7899C13.5798 8.0699 13.7398 7.2999 13.7398 6.4799C13.7398 5.6599 13.5798 4.8899 13.2598 4.1699C12.9598 3.4499 12.5398 2.8199 11.9998 2.2799C11.4798 1.7399 10.8598 1.3199 10.1398 1.0199C9.41981 0.699902 8.64981 0.539901 7.82981 0.539901H1.0498C0.909805 0.539901 0.789805 0.589901 0.689805 0.689901C0.589805 0.789901 0.539805 0.919901 0.539805 1.0799V21.1499H-0.000195228Z"
                  fill="black"
                />
              </svg>
            </span>
            <span class="letter o solid-circle dot-container">
            </span>
            <span class="letter l"
              ><svg
                width="16"
                height="22"
                viewBox="0 0 16 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.539805 -9.89437e-05V20.0699C0.539805 20.2299 0.589805 20.3599 0.689805 20.4599C0.789805 20.5599 0.919805 20.6099 1.0798 20.6099H15.8098V21.1499H1.0798C0.779805 21.1499 0.519805 21.0499 0.299805 20.8499C0.0998048 20.6299 -0.000195228 20.3699 -0.000195228 20.0699V-9.89437e-05H0.539805Z"
                  fill="black"
                />
              </svg>
            </span>
            <span class="letter o solid-circle dot-container">
            </span>
            <span class="letter d"
              ><svg
                width="18"
                height="22"
                viewBox="0 0 17 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.539805 20.5799H6.44981C7.8298 20.5799 9.1298 20.3199 10.3498 19.7999C11.5698 19.2599 12.6298 18.5399 13.5298 17.6399C14.4298 16.7399 15.1398 15.6799 15.6598 14.4599C16.1998 13.2399 16.4698 11.9399 16.4698 10.5599C16.4698 9.1799 16.1998 7.8799 15.6598 6.6599C15.1398 5.4399 14.4298 4.3799 13.5298 3.4799C12.6298 2.5599 11.5698 1.8399 10.3498 1.3199C9.1298 0.799901 7.8298 0.539901 6.44981 0.539901H1.0798C0.919805 0.539901 0.789805 0.589901 0.689805 0.689901C0.589805 0.789901 0.539805 0.919901 0.539805 1.0799V20.5799ZM-0.000195228 1.0799C-0.000195228 0.779902 0.0998048 0.529902 0.299805 0.329902C0.519805 0.109901 0.779805 -9.89437e-05 1.0798 -9.89437e-05H6.44981C7.90981 -9.89437e-05 9.27981 0.279901 10.5598 0.839901C11.8398 1.3799 12.9598 2.1299 13.9198 3.0899C14.8798 4.0499 15.6298 5.1699 16.1698 6.4499C16.7298 7.7299 17.0098 9.0999 17.0098 10.5599C17.0098 12.0199 16.7298 13.3899 16.1698 14.6699C15.6298 15.9499 14.8798 17.0699 13.9198 18.0299C12.9598 18.9899 11.8398 19.7499 10.5598 20.3099C9.27981 20.8499 7.90981 21.1199 6.44981 21.1199H-0.000195228V1.0799Z"
                  fill="black"
                />
              </svg>
            </span>
            <span class="letter e"
              ><svg
                width="16"
                height="22"
                viewBox="0 0 16 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.9898 21.1499H-0.000195228V1.0799C-0.000195228 0.779902 0.0998048 0.529902 0.299805 0.329902C0.499805 0.109901 0.749805 -9.89437e-05 1.0498 -9.89437e-05H15.7798V0.539901H1.0498C0.889805 0.539901 0.759805 0.589901 0.659805 0.689901C0.579805 0.789901 0.539805 0.919901 0.539805 1.0799V10.3499H15.9898V10.8899H0.539805V20.6099H15.9898V21.1499Z"
                  fill="black"
                />
              </svg>
            </span>
            <span class="letter x"
              ><svg
                width="19"
                height="22"
                viewBox="0 0 19 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 10.1399L17.31 -9.89437e-05H18.03L9.36 10.5899L18.03 21.1499H17.31L9 11.0099L0.69 21.1499H0L8.64 10.5899L0 -9.89437e-05H0.69L9 10.1399Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>
          <div><p id="beta-text">beta release</p></div>
        </div>
      `;
    }

    connectedCallback() {
        if (!this.hasAttribute("clickable")) {
            const betaTxt = this.shadowRoot.querySelector("#beta-text");
            betaTxt?.classList.add("hide");
            const solidCircle = this.shadowRoot.querySelectorAll(".solid-circle");
            const letters = this.shadowRoot.querySelectorAll(".letter:not(.o)");

            letters.forEach((letter) => {
                letter.style.color = 'var(--grey)';
            });
            solidCircle.forEach((circle) => {
                circle.style.backgroundColor = "var(--grey)";
                console.log(circle.style.backgroundColor);
            });

        };
        if (this._eventsAttached) return;

        this._eventsAttached = true;
        this.attachEvents();
    }

    attachEvents() {
        const letters = this.shadowRoot.querySelectorAll(".letter:not(.o)");
        const rolodex = this.shadowRoot.querySelector(".rolodex");
        const dots = this.shadowRoot.querySelectorAll(".solid-circle");
        const betaTxt = this.shadowRoot.querySelector("#beta-text");

        const footnote = document.querySelector(".footer");
        const copyright = document.getElementById("copyright");
        const copyrightRolodex = document.getElementById("copyright-rolodex");
        const toggle = document.querySelector(".toggle");

        if (!rolodex || dots.length < 2) return;

        rolodex.addEventListener("click", () => {
            if (this.hasGeneratedDots) return;

            betaTxt?.classList.add("hidden");
            footnote?.classList.remove("hidden");
            localStorage.setItem("landing", "true");

            letters.forEach((letter) => {
                letter.classList.add("hidden");
            });

            // Bring the two title dots together
            setTimeout(() => {
                dots[0].classList.add("o1");
                dots[1].classList.add("o2");
            }, 50);

            // Generate the expanding universe
            setTimeout(() => {
                if (this.hasGeneratedDots) return;

                this.hasGeneratedDots = true;

                const dot1 = dots[0].getBoundingClientRect();
                const dot2 = dots[1].getBoundingClientRect();

                const originX =
                    (dot1.left + dot1.width / 2 +
                        dot2.left + dot2.width / 2) / 2;

                const originY =
                    (dot1.top + dot1.height / 2 +
                        dot2.top + dot2.height / 2) / 2;

                if (typeof this.generateDots === "function") {
                    this.generateDots({ originX, originY });
                }

                this.shadowRoot
                    .querySelectorAll(".solid-circle, .finaldots")
                    .forEach((dot) => {
                        dot.style.backgroundColor = "transparent";
                    });

                copyright?.classList.add("hide");
                copyrightRolodex?.classList.remove("hidden");
                toggle?.classList.remove("hidden");
            }, 1900);
        });
    }
}

customElements.define("rolodex-title", RolodexTitle);