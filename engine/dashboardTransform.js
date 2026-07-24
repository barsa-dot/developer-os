// =========================================
// BARSA OS — Dashboard Transformation
// =========================================

class DashboardTransformEngine {
    transform() {
        console.log("[DashboardTransform] Converting arcade maze to dashboard grid...");
        const arena = document.getElementById("arcade-arena");
        const maze = document.getElementById("maze-layer");
        const characters = document.getElementById("character-layer");

        if (maze) maze.style.opacity = "0.15";
        if (characters) characters.style.display = "none";

        if (arena) {
            arena.classList.add("dashboard-active");
            arena.innerHTML = `
                <div id="dashboard-grid" class="dashboard-grid">
                    <div id="widget-profile" class="dash-widget"></div>
                    <div id="widget-repos" class="dash-widget"></div>
                    <div id="widget-activity" class="dash-widget"></div>
                </div>
            `;
        }
    }
}

window.dashboardTransformEngine = new DashboardTransformEngine();