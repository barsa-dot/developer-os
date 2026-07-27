// =========================================
// BARSA OS — Ghosts Controller Engine
// =========================================

if (typeof window.GhostEngine === "undefined") {

    class GhostEngine {
        constructor() {
            this.ghosts = [
                { id: "blinky", color: "#FF0000", x: 200, y: 180, dx: 2, dy: 0 },
                { id: "pinky", color: "#FFB8FF", x: 230, y: 180, dx: -2, dy: 0 },
                { id: "inky", color: "#00FFFF", x: 260, y: 180, dx: 0, dy: 2 },
                { id: "clyde", color: "#FFB852", x: 290, y: 180, dx: 0, dy: -2 }
            ];
            this.interval = null;
        }

        getInlineSVG(colorHex) {
            return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path fill='${encodeURIComponent(colorHex)}' d='M12 2C6.48 2 2 6.48 2 12v10l4-4 4 4 4-4 4 4 4-4V12c0-5.52-4.48-10-10-10z'/><circle cx='8' cy='10' r='2' fill='%23FFFFFF'/><circle cx='16' cy='10' r='2' fill='%23FFFFFF'/><circle cx='8' cy='10' r='1' fill='%230000FF'/><circle cx='16' cy='10' r='1' fill='%230000FF'/></svg>`;
        }

        spawn() {
            console.log("[GhostEngine] Spawning ghosts into arena...");
            const layer = document.getElementById("character-layer");
            if (!layer) return;

            // Clean up old ghost sprites
            document.querySelectorAll(".ghost-sprite").forEach(e => e.remove());

            this.ghosts.forEach(ghost => {
                const img = document.createElement("img");
                img.id = ghost.id;
                img.className = "ghost-sprite";
                img.src = this.getInlineSVG(ghost.color);
                img.style.left = `${ghost.x}px`;
                img.style.top = `${ghost.y}px`;
                img.style.width = "24px";
                img.style.height = "24px";
                img.style.position = "absolute";
                img.alt = ghost.id;

                layer.appendChild(img);
            });
        }

        startPatrol() {
            console.log("[GhostEngine] Ghosts moving on patrol routes...");
            if (this.interval) clearInterval(this.interval);

            this.interval = setInterval(() => {
                this.ghosts.forEach(ghost => {
                    const elem = document.getElementById(ghost.id);
                    if (!elem) return;

                    ghost.x += ghost.dx;
                    ghost.y += ghost.dy;

                    // Bounce within arena boundaries
                    if (ghost.x > 800 || ghost.x < 20) ghost.dx *= -1;
                    if (ghost.y > 340 || ghost.y < 20) ghost.dy *= -1;

                    elem.style.left = `${ghost.x}px`;
                    elem.style.top = `${ghost.y}px`;
                });
            }, 60);
        }

        stopPatrol() {
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }
        }
    }

    window.GhostEngine = GhostEngine;
    window.ghostEngine = new GhostEngine();
}