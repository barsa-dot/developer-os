// =========================================
// BARSA OS — Pac-Man Engine
// =========================================

if (typeof window.PacmanEngine === "undefined") {

    class PacmanEngine {
        constructor() {
            // Updated starting coordinates to fit inside the top maze lane
            this.x = 30;
            this.y = 25;
            this.speed = 4;
            this.isInvincible = false;
            this.patrolInterval = null;
        }

        init() {
            console.log("[PacmanEngine] Initializing Pac-Man controller...");
            const pacman = document.getElementById("pacman");
            if (pacman) {
                pacman.style.left = `${this.x}px`;
                pacman.style.top = `${this.y}px`;
            }
            this.bindControls();
        }

        bindControls() {
            window.addEventListener("keydown", (e) => {
                // Ignore key movements if typing in the CLI terminal
                const activeElement = document.activeElement;
                if (activeElement && activeElement.id === "cli-input") return;

                if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                    e.preventDefault();
                    this.move(e.key);
                }
            });
        }

        move(direction) {
            const pacman = document.getElementById("pacman");
            if (!pacman) return;

            if (direction === "ArrowUp") this.y = Math.max(25, this.y - this.speed);
            if (direction === "ArrowDown") this.y = Math.min(340, this.y + this.speed);
            if (direction === "ArrowLeft") this.x = Math.max(30, this.x - this.speed);
            if (direction === "ArrowRight") this.x = Math.min(800, this.x + this.speed);

            pacman.style.left = `${this.x}px`;
            pacman.style.top = `${this.y}px`;

            // Spawn particle sparks on movement if particle engine exists
            if (window.particleEngine) {
                window.particleEngine.spawnSparks(this.x + 10, this.y + 10, 3, "#FFFF00");
            }
        }

        startPatrol() {
            console.log("[PacmanEngine] Patrol started.");
            if (this.patrolInterval) clearInterval(this.patrolInterval);

            // Auto-patrol across the top path inside the maze
            let direction = 1;
            this.patrolInterval = setInterval(() => {
                const pacman = document.getElementById("pacman");
                if (!pacman) return;

                this.x += direction * 2;
                if (this.x > 300 || this.x < 30) direction *= -1;

                pacman.style.left = `${this.x}px`;
                pacman.style.top = `${this.y}px`;
            }, 50);
        }

        stopPatrol() {
            if (this.patrolInterval) {
                clearInterval(this.patrolInterval);
                this.patrolInterval = null;
            }
        }
    }

    // Attach to window globally
    window.PacmanEngine = PacmanEngine;
    window.pacmanEngine = new PacmanEngine();
}