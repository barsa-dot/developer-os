// ===============================
// BARSA OS — Maze Rendering Engine
// ===============================

class MazeEngine {
    constructor(containerId) {
        this.containerId = containerId;
    }

    render() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`[MazeEngine] Container "#${this.containerId}" not found.`);
            return;
        }

        container.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg">
                <!-- Outer Arena Double Border -->
                <rect x="10" y="10" width="700" height="360" rx="8" fill="none" stroke="#1F6FEB" stroke-width="4"/>
                <rect x="18" y="18" width="684" height="344" rx="6" fill="none" stroke="#1F6FEB" stroke-width="2"/>
                
                <!-- Corner Block Obstacles -->
                <path d="M 50 50 H 280 V 130 H 50 Z" fill="none" stroke="#1F6FEB" stroke-width="3"/>
                <path d="M 440 50 H 670 V 130 H 440 Z" fill="none" stroke="#1F6FEB" stroke-width="3"/>
                <path d="M 50 250 H 280 V 330 H 50 Z" fill="none" stroke="#1F6FEB" stroke-width="3"/>
                <path d="M 440 250 H 670 V 330 H 440 Z" fill="none" stroke="#1F6FEB" stroke-width="3"/>

                <!-- Central Dividers -->
                <path d="M 310 50 H 410 V 110 H 310 Z" fill="none" stroke="#1F6FEB" stroke-width="3"/>
                <path d="M 310 270 H 410 V 330 H 310 Z" fill="none" stroke="#1F6FEB" stroke-width="3"/>
                
                <!-- Ghost House Frame -->
                <rect x="300" y="150" width="120" height="80" rx="4" fill="none" stroke="#FFB8FF" stroke-width="2"/>
                <!-- Ghost House Gate -->
                <line x1="340" y1="150" x2="380" y2="150" stroke="#FFFFFF" stroke-width="3"/>
            </svg>
        `;
        console.log("[MazeEngine] Maze paths rendered.");
    }
}

// Global Export
window.mazeEngine = new MazeEngine("maze-layer");