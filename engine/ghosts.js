// =========================================
// BARSA OS — Ghost Engine with Unique Spawns
// =========================================

if (typeof window.GhostEngine === "undefined") {

    class GhostEngine {
        constructor() {
            this.tileSize = 16;
            // Distinct initial spawn positions inside ghost box
            this.ghosts = [
                { id: "blinky", color: "#FF0000", tileX: 12, tileY: 10, dir: { x: 0, y: -1 } },
                { id: "pinky",  color: "#FFB8FF", tileX: 13, tileY: 10, dir: { x: 0, y: -1 } },
                { id: "inky",   color: "#00FFFF", tileX: 14, tileY: 10, dir: { x: 0, y: -1 } },
                { id: "clyde",  color: "#FFB852", tileX: 15, tileY: 10, dir: { x: 0, y: -1 } }
            ];
            this.interval = null;
        }

        getInlineSVG(colorHex) {
            return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'><path fill='${encodeURIComponent(colorHex)}' d='M12 2C6.48 2 2 6.48 2 12v10l4-4 4 4 4-4 4 4 4-4V12c0-5.52-4.48-10-10-10z'/><circle cx='8' cy='10' r='2' fill='%23FFFFFF'/><circle cx='16' cy='10' r='2' fill='%23FFFFFF'/><circle cx='8' cy='10' r='1' fill='%230000FF'/><circle cx='16' cy='10' r='1' fill='%230000FF'/></svg>`;
        }

        spawn() {
            const layer = document.getElementById("character-layer");
            if (!layer) return;

            document.querySelectorAll(".ghost-sprite").forEach(e => e.remove());

            this.ghosts.forEach(ghost => {
                const img = document.createElement("img");
                img.id = ghost.id;
                img.className = "ghost-sprite";
                img.src = this.getInlineSVG(ghost.color);
                img.style.left = `${ghost.tileX * this.tileSize}px`;
                img.style.top = `${ghost.tileY * this.tileSize}px`;
                img.alt = ghost.id;
                layer.appendChild(img);
            });
        }

        startPatrol() {
            if (this.interval) clearInterval(this.interval);

            this.interval = setInterval(() => {
                const maze = window.mazeEngine;

                this.ghosts.forEach(ghost => {
                    const elem = document.getElementById(ghost.id);
                    if (!elem) return;

                    const validMoves = [
                        { x: 0, y: -1 },
                        { x: 0, y: 1 },
                        { x: -1, y: 0 },
                        { x: 1, y: 0 }
                    ].filter(d => {
                        const isReverse = (d.x === -ghost.dir.x && d.y === -ghost.dir.y);
                        return !isReverse && maze && maze.isWalkable(ghost.tileX + d.x, ghost.tileY + d.y);
                    });

                    if (validMoves.length > 0) {
                        // Pick random valid path direction
                        ghost.dir = validMoves[Math.floor(Math.random() * validMoves.length)];
                    } else {
                        // Reverse if stuck
                        ghost.dir = { x: -ghost.dir.x, y: -ghost.dir.y };
                    }

                    if (maze && maze.isWalkable(ghost.tileX + ghost.dir.x, ghost.tileY + ghost.dir.y)) {
                        ghost.tileX += ghost.dir.x;
                        ghost.tileY += ghost.dir.y;
                    }

                    elem.style.left = `${ghost.tileX * this.tileSize}px`;
                    elem.style.top = `${ghost.tileY * this.tileSize}px`;
                });
            }, 180);
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