// =========================================
// BARSA OS — Path-Following Pac-Man Engine
// =========================================

class PacmanEngine {
    constructor(elementId) {
        this.elementId = elementId;
        this.pacmanEl = null;
        this.stepIndex = 0;
        this.isMoving = false;

        // Waypoints matching the grid coordinates of the maze corridors
        this.waypoints = [
            { x: 20,  y: 20,  rotation: 0 },    // Top-Left corner
            { x: 345, y: 20,  rotation: 0 },    // Top-Center
            { x: 670, y: 20,  rotation: 90 },   // Top-Right corner
            { x: 670, y: 330, rotation: 180 },  // Bottom-Right corner
            { x: 345, y: 330, rotation: 180 },  // Bottom-Center
            { x: 20,  y: 330, rotation: 270 }   // Bottom-Left corner
        ];
    }

    init() {
        this.pacmanEl = document.getElementById(this.elementId);
        if (!this.pacmanEl) {
            console.error(`[PacmanEngine] Element "#${this.elementId}" not found.`);
            return;
        }

        // Setup base position & transition mechanics
        this.pacmanEl.style.position = "absolute";
        this.pacmanEl.style.width = "28px";
        this.pacmanEl.style.height = "28px";
        this.pacmanEl.style.transition = "left 1.2s linear, top 1.2s linear, transform 0.2s ease";
        this.pacmanEl.style.zIndex = "10";

        // Spawn at starting waypoint
        const start = this.waypoints[0];
        this.pacmanEl.style.left = `${start.x}px`;
        this.pacmanEl.style.top = `${start.y}px`;
        this.pacmanEl.style.transform = `rotate(${start.rotation}deg)`;
    }

    startPatrol() {
        if (this.isMoving || !this.pacmanEl) return;
        this.isMoving = true;
        this.stepIndex = 1;
        this.moveToNextWaypoint();
    }

    moveToNextWaypoint() {
        if (!this.isMoving) return;

        const target = this.waypoints[this.stepIndex];
        
        // Face the movement direction and shift position
        this.pacmanEl.style.transform = `rotate(${target.rotation}deg)`;
        this.pacmanEl.style.left = `${target.x}px`;
        this.pacmanEl.style.top = `${target.y}px`;

        // Advance to next waypoint loop after transition completes
        setTimeout(() => {
            this.stepIndex = (this.stepIndex + 1) % this.waypoints.length;
            this.moveToNextWaypoint();
        }, 1200);
    }
}

// Global Export
window.pacmanEngine = new PacmanEngine("pacman");