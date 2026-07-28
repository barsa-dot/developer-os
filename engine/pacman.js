// =========================================
// BARSA OS — Grid-Aligned Pac-Man Controller
// =========================================

if (typeof window.PacmanEngine === "undefined") {

    class PacmanEngine {
        constructor() {
            this.tileX = 1;
            this.tileY = 1;
            this.tileSize = 16;
            this.dir = { x: 1, y: 0 }; // Moving right
            this.nextDir = { x: 1, y: 0 };
            this.rotation = 0;
            this.interval = null;
        }

        init() {
            console.log("[PacmanEngine] Initializing grid-aligned Pac-Man...");
            const pacman = document.getElementById("pacman");
            if (pacman) {
                pacman.style.left = `${this.tileX * this.tileSize}px`;
                pacman.style.top = `${this.tileY * this.tileSize}px`;
            }
            this.bindControls();
        }

        bindControls() {
            window.addEventListener("keydown", (e) => {
                const activeElement = document.activeElement;
                if (activeElement && activeElement.id === "cli-input") return;

                if (e.key === "ArrowUp") this.nextDir = { x: 0, y: -1, rot: 270 };
                if (e.key === "ArrowDown") this.nextDir = { x: 0, y: 1, rot: 90 };
                if (e.key === "ArrowLeft") this.nextDir = { x: -1, y: 0, rot: 180 };
                if (e.key === "ArrowRight") this.nextDir = { x: 1, y: 0, rot: 0 };
            });
        }

        startPatrol() {
            console.log("[PacmanEngine] Starting coordinated path patrol...");
            if (this.interval) clearInterval(this.interval);

            this.interval = setInterval(() => {
                const maze = window.mazeEngine;
                const pacman = document.getElementById("pacman");
                if (!pacman) return;

                // Try applying queued direction if path is open
                if (maze && maze.isWalkable(this.tileX + this.nextDir.x, this.tileY + this.nextDir.y)) {
                    this.dir = this.nextDir;
                    if (typeof this.nextDir.rot !== "undefined") this.rotation = this.nextDir.rot;
                }

                // Check next cell in current direction
                const nextX = this.tileX + this.dir.x;
                const nextY = this.tileY + this.dir.y;

                if (maze && maze.isWalkable(nextX, nextY)) {
                    this.tileX = nextX;
                    this.tileY = nextY;
                } else {
                    // Turn automatically at corner walls
                    const alternates = [
                        { x: 0, y: -1, rot: 270 },
                        { x: 0, y: 1, rot: 90 },
                        { x: -1, y: 0, rot: 180 },
                        { x: 1, y: 0, rot: 0 }
                    ];
                    for (let alt of alternates) {
                        if ((alt.x !== -this.dir.x || alt.y !== -this.dir.y) && maze.isWalkable(this.tileX + alt.x, this.tileY + alt.y)) {
                            this.dir = alt;
                            this.rotation = alt.rot;
                            this.tileX += alt.x;
                            this.tileY += alt.y;
                            break;
                        }
                    }
                }

                // Smooth position rendering with rotation facing
                pacman.style.left = `${this.tileX * this.tileSize}px`;
                pacman.style.top = `${this.tileY * this.tileSize}px`;
                pacman.style.transform = `rotate(${this.rotation}deg)`;

                // Particle sparks
                if (window.particleEngine) {
                    window.particleEngine.spawnSparks(this.tileX * 16 + 8, this.tileY * 16 + 8, 2, "#FFFF00");
                }
            }, 120);
        }

        stopPatrol() {
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }
        }
    }

    window.PacmanEngine = PacmanEngine;
    window.pacmanEngine = new PacmanEngine();
}