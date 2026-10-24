// parent component:
// .audio-controls {
//     position: absolute;
//     top: 3vh;
//     z-index: 999;
// }

// .audio-controls--left {
//     left: 2vw;
// }

// .audio-controls--right {
//     right: 2vw;
// }

// <div class="audio-controls audio-controls--left">
//     <audio-player-controls src="your-audio-url"></audio-player-controls>
// </div>

class AudioPlayerControls extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                .controls {
                    display: flex;
                    align-items: center;
                    width: 18vw;
                    gap: 8px;
                }

                .play-btn {
                    background: transparent;
                    border: none;
                    padding: 0;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 18px;
                    height: 18px;
                    flex-shrink: 0;
                    color: #0e0e0e;
                }

                .play-btn svg {
                    width: 18px;
                    height: 18px;
                    fill: currentColor;
                }

                .play-btn:hover {
                    color: #444;
                }

                .pause-icon,
                .play-icon {
                    display: none;
                }

                .play-btn[aria-pressed="false"] .play-icon,
                .play-btn[aria-pressed="true"] .pause-icon {
                    display: block;
                }

                .timeline {
                    display: flex;
                    flex: 1;
                    align-items: center;
                    min-width: 0;
                }

                .progress {
                    width: 100%;
                    height: 4px;
                    background: #a3a3a3;
                    border-radius: 25px;
                    cursor: pointer;
                    overflow: hidden;
                }

                .progress-filled {
                    height: 100%;
                    width: 0%;
                    background: #0e0e0e;
                }

                .volume-container {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    width: 5vw;
                    margin-left: 1vw;
                }

                .volume-icon {
                    width: 16px;
                    height: 16px;
                    flex-shrink: 0;
                }

                .volume {
                    width: 100%;
                    min-width: 0;
                    height: 4px;
                    cursor: pointer;
                    accent-color: #0e0e0e;
                }

                @media (max-width: 600px) {
                    .controls {
                        width: 42vw;
                    }

                    .volume-container {
                        width: 12vw;
                    }
                }
            </style>

            <audio preload="metadata"></audio>

            <div class="controls">
                <button
                    class="play-btn"
                    type="button"
                    aria-label="Play audio"
                    aria-pressed="false"
                >
                    <svg class="play-icon" viewBox="0 0 24 24"
                         aria-hidden="true">
                        <polygon points="19.05 12 6 3.36 6 20.64"></polygon>
                    </svg>

                    <svg class="pause-icon" viewBox="0 0 24 24"
                         aria-hidden="true">
                        <rect x="6" y="3.26" width="4" height="17.48"></rect>
                        <rect x="14" y="3.26" width="4" height="17.48"></rect>
                    </svg>
                </button>

                <div class="timeline">
                    <div
                        class="progress"
                        role="slider"
                        tabindex="0"
                        aria-label="Audio progress"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-valuenow="0"
                    >
                        <div class="progress-filled"></div>
                    </div>
                </div>

                <div class="volume-container">
                    <svg class="volume-icon" viewBox="0 0 16 16"
                         aria-hidden="true">
                        <path
                            d="M1 5H4L9 1V15L4 11H1Z"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.2"
                        />
                        <path
                            d="M11 4Q15 8 11 12"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.2"
                        />
                    </svg>

                    <input
                        class="volume"
                        type="range"
                        min="0"
                        max="1"
                        value="1"
                        step="0.01"
                        aria-label="Volume"
                    />
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.audio = this.shadowRoot.querySelector("audio");
        this.playButton = this.shadowRoot.querySelector(".play-btn");
        this.progress = this.shadowRoot.querySelector(".progress");
        this.progressFilled =
            this.shadowRoot.querySelector(".progress-filled");
        this.volume = this.shadowRoot.querySelector(".volume");

        this.audio.src = this.getAttribute("src") || "";
        this.audio.volume = Number(this.getAttribute("volume") ?? 1);

        this.volume.value = this.audio.volume;

        this.playButton.addEventListener("click", this.togglePlayback);
        this.audio.addEventListener("play", this.updatePlayButton);
        this.audio.addEventListener("pause", this.updatePlayButton);
        this.audio.addEventListener("ended", this.updatePlayButton);
        this.audio.addEventListener("timeupdate", this.updateProgress);

        this.progress.addEventListener("click", this.seek);
        this.progress.addEventListener("keydown", this.handleProgressKey);
        this.volume.addEventListener("input", this.updateVolume);
    }

    disconnectedCallback() {
        this.playButton?.removeEventListener("click", this.togglePlayback);
        this.audio?.removeEventListener("play", this.updatePlayButton);
        this.audio?.removeEventListener("pause", this.updatePlayButton);
        this.audio?.removeEventListener("ended", this.updatePlayButton);
        this.audio?.removeEventListener("timeupdate", this.updateProgress);

        this.progress?.removeEventListener("click", this.seek);
        this.progress?.removeEventListener("keydown", this.handleProgressKey);
        this.volume?.removeEventListener("input", this.updateVolume);
    }

    togglePlayback = async () => {
        if (this.audio.paused) {
            try {
                await this.audio.play();
            } catch (error) {
                console.error("Unable to play audio:", error);
            }
        } else {
            this.audio.pause();
        }
    };

    updatePlayButton = () => {
        const playing = !this.audio.paused;

        this.playButton.setAttribute("aria-pressed", String(playing));
        this.playButton.setAttribute(
            "aria-label",
            playing ? "Pause audio" : "Play audio"
        );
    };

    updateProgress = () => {
        const duration = this.audio.duration;

        if (!Number.isFinite(duration) || duration <= 0) return;

        const percentage = (this.audio.currentTime / duration) * 100;

        this.progressFilled.style.width = `${percentage}%`;
        this.progress.setAttribute("aria-valuenow", String(Math.round(percentage)));
    };

    seek = (event) => {
        const duration = this.audio.duration;

        if (!Number.isFinite(duration) || duration <= 0) return;

        const rect = this.progress.getBoundingClientRect();
        const percentage = Math.max(
            0,
            Math.min(1, (event.clientX - rect.left) / rect.width)
        );

        this.audio.currentTime = percentage * duration;
        this.updateProgress();
    };

    handleProgressKey = (event) => {
        const duration = this.audio.duration;

        if (!Number.isFinite(duration) || duration <= 0) return;

        const steps = {
            ArrowRight: 5,
            ArrowLeft: -5
        };

        if (!(event.key in steps)) return;

        event.preventDefault();

        this.audio.currentTime = Math.max(
            0,
            Math.min(duration, this.audio.currentTime + steps[event.key])
        );

        this.updateProgress();
    };

    updateVolume = () => {
        this.audio.volume = Number(this.volume.value);
    };
}

customElements.define("audio-player-controls", AudioPlayerControls);