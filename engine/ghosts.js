// =========================================
// BARSA OS — Ghost Movement Engine
// =========================================

class GhostEngine {
    constructor(containerId) {
        this.containerId = containerId;
        this.ghosts = [
            { name: "blinky", color: "#FF0000", x: 320, y: 175, dx: 1, dy: 0 },
            { name: "pinky",  color: "#FFB8FF", x: 340, y: 175, dx: -1, dy: 0 },
            { name: "inky",   color: "#00FFFF", x: 360, y: 175, dx: 0, dy: 1 },
            { name: "clyde",  color: "#FFB852", x: 380, y: 175, dx: 0, dy: -1 }
        ];
        this.activeElements = [];
        this.animFrameId = null;
    }

    spawn() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`[GhostEngine] Container "#${this.containerId}" not found.`);
            return;
        }

        this.ghosts.forEach(g => {
            const el = document.createElement("div");
            el.id = `ghost-${g.name}`;
            el.className = "ghost-character";
            el.style.cssText = `
                position: absolute;
                left: ${g.x}px;
                top: ${g.y}px;
                width: 26px;
                height: 26px;
                transition: left 0.8s linear, top 0.8s linear;
                z-index: 5;
            `;

            // SVG markup for classic ghost dome + eyes
            el.innerHTML = `
                <svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 3 24 V 10 A 10 10 0 0 1 23 10 V 24 L 20 21 L 17 24 L 13 21 L 10 24 L 7 21 Z" fill="${g.color}" />
                    <!-- Eyes -->
                    <circle cx="8" cy="10" r="3" fill="#FFFFFF"/>
                    <circle cx="9" cy="10" r="1.5" fill="#0000FF"/>
                    <circle cx="17" cy="10" r="3" fill="#FFFFFF"/>
                    <circle cx="18" cy="10" r="1.5" fill="#0000FF"/>
                </svg>
            `;

            container.appendChild(el);
            this.activeElements.push({ data: g, element: el });
        });

        console.log("[GhostEngine] 4 Ghosts spawned.");
    }

    startPatrol() {
        this.patrolInterval = setInterval(() => {
            this.activeElements.forEach(item => {
                const g = item.data;
                const el = item.element;

                // Move within central zone bounds
                g.x += g.dx * 30;
                g.y += g.dy * 20;

                // Simple bounce off arena interior walls
                if (g.x > 650 || g.x < 50) g.dx *= -1;
                if (g.y > 310 || g.y < 50) g.dy *= -1;

                el.style.left = `${g.x}px`;
                el.style.top = `${g.y}px`;
            });
        }, 800);
    }
}

// Global Export
window.ghostEngine = new GhostEngine("character-layer");