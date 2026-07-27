// =========================================
// BARSA OS — Responsive Layout Engine
// =========================================

class ResponsiveEngine {
    init() {
        window.addEventListener("resize", () => this.handleResize());
        this.handleResize();
    }

    handleResize() {
        const width = window.innerWidth;
        const arena = document.getElementById("arcade-arena");
        if (!arena) return;

        if (width < 768) {
            arena.classList.add("mobile-view");
        } else {
            arena.classList.remove("mobile-view");
        }
    }
}

window.responsiveEngine = new ResponsiveEngine();