// =========================================
// BARSA OS — Pac-Man Player Engine & Controls
// =========================================

if (typeof window.PacmanEngine === "undefined") {

    class PacmanEngine {
        constructor() {
            this.tileSize = 16;
            this.tileX = 13;
            this.tileY = 15;
            
            this.dir = { x: 0, y: 0 };
            this.nextDir = { x: 0, y: 0 };
            
            this.interval = null;
            this.score = 0;
            
            this.initControls();
        }

        getInlineSVG() {
            return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'><path fill='%23FFFF00' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.4 13.8L12 13.5l-4.4 2.3 1.1-4.9-3.8-3.3 5-.4L12 2.5l2.1 4.7 5 .4-3.8 3.3 1.1 4.9z'/></svg>`;
        }

        spawn() {
            const layer = document.getElementById("character-layer");
            if (!layer) return;

            let elem = document.getElementById("pacman");
            if (!elem) {
                elem = document.createElement("img");
                elem.id = "pacman";
                elem.src = this.getInlineSVG();
                layer.appendChild(elem);
            }

            this.tileX = 13;
            this.tileY = 15;
            this.dir = { x: 0, y: 0 };
            this.nextDir = { x: 0, y: 0 };

            elem.style.left = `${this.tileX * this.tileSize}px`;
            elem.style.top = `${this.tileY * this.tileSize}px`;
        }

        initControls() {
            // Listen on global window object
            window.addEventListener("keydown", (e) => {
                const key = e.key.toLowerCase();
                
                // Prevent scrolling
                if (["arrowup", "arrowdown", "arrowleft", "arrowright", " ", "w", "a", "s", "d"].includes(key)) {
                    e.preventDefault();
                }

                let registered = false;

                switch (key) {
                    case "arrowup":
                    case "w":
                        this.nextDir = { x: 0, y: -1 };
                        registered = true;
                        break;
                    case "arrowdown":
                    case "s":
                        this.nextDir = { x: 0, y: 1 };
                        registered = true;
                        break;
                    case "arrowleft":
                    case "a":
                        this.nextDir = { x: -1, y: 0 };
                        registered = true;
                        break;
                    case "arrowright":
                    case "d":
                        this.nextDir = { x: 1, y: 0 };
                        registered = true;
                        break;
                }

                // If movement hasn't started yet, force start loop
                if (registered && !this.interval) {
                    this.start();
                }
            });

            // Ensure window captures key events when clicked
            window.addEventListener("click", () => {
                window.focus();
            });
        }

        start() {
            if (this.interval) clearInterval(this.interval);

            this.interval = setInterval(() => {
                const maze = window.mazeEngine;
                const elem = document.getElementById("pacman");
                if (!elem || !maze) return;

                // 1. Try to switch to requested next direction if walkable
                if (
                    (this.nextDir.x !== 0 || this.nextDir.y !== 0) &&
                    maze.isWalkable(this.tileX + this.nextDir.x, this.tileY + this.nextDir.y)
                ) {
                    this.dir = { ...this.nextDir };
                }

                // 2. Move in active direction if walkable
                if (maze.isWalkable(this.tileX + this.dir.x, this.tileY + this.dir.y)) {
                    this.tileX += this.dir.x;
                    this.tileY += this.dir.y;

                    // Tunnel wrap-around
                    if (this.tileX < 0) this.tileX = 27;
                    else if (this.tileX >= 28) this.tileX = 0;

                    elem.style.left = `${this.tileX * this.tileSize}px`;
                    elem.style.top = `${this.tileY * this.tileSize}px`;
                }
            }, 140);
        }

        stop() {
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }
        }
    }

    window.PacmanEngine = PacmanEngine;
    window.pacmanEngine = new PacmanEngine();
}