// ===============================
// BARSA OS — Pellet Generation Engine
// ===============================

class PelletEngine {
    constructor(containerId) {
        this.containerId = containerId;
    }

    generate() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`[PelletEngine] Container "#${this.containerId}" not found.`);
            return;
        }

        let html = `<svg width="100%" height="100%" viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg">`;

        // 1. Power Pellets (4 Corners)
        const powerPellets = [
            { x: 34, y: 34 },
            { x: 686, y: 34 },
            { x: 34, y: 346 },
            { x: 686, y: 346 }
        ];

        powerPellets.forEach(pt => {
            html += `<circle cx="${pt.x}" cy="${pt.y}" r="7" fill="#FFB8AE" class="power-pellet" />`;
        });

        // 2. Standard Dots (Top and Bottom Horizontal Corridors)
        for (let x = 60; x <= 660; x += 24) {
            // Leave space around the center column
            if (x < 290 || x > 430) {
                html += `<circle cx="${x}" cy="34" r="3" fill="#FFB8AE" />`;
                html += `<circle cx="${x}" cy="346" r="3" fill="#FFB8AE" />`;
            }
        }

        // 3. Standard Dots (Outer Vertical Corridors)
        for (let y = 60; y <= 320; y += 24) {
            html += `<circle cx="34" cy="${y}" r="3" fill="#FFB8AE" />`;
            html += `<circle cx="686" cy="${y}" r="3" fill="#FFB8AE" />`;
        }

        // 4. Standard Dots (Middle Horizontal Walkway)
        for (let x = 60; x <= 270; x += 24) {
            html += `<circle cx="${x}" cy="190" r="3" fill="#FFB8AE" />`;
            html += `<circle cx="${720 - x}" cy="190" r="3" fill="#FFB8AE" />`;
        }

        html += `</svg>`;
        container.innerHTML = html;
        console.log("[PelletEngine] Pellets generated.");
    }
}

// Global Export
window.pelletEngine = new PelletEngine("pellet-layer");