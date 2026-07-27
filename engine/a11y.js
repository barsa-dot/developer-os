// =========================================
// BARSA OS — Accessibility (A11y) Engine
// =========================================

class A11yEngine {
    init() {
        console.log("[A11yEngine] Configuring screen reader support & high-contrast hooks...");
        const arena = document.getElementById("arcade-arena");
        if (arena) {
            arena.setAttribute("role", "region");
            arena.setAttribute("aria-label", "Interactive BARSA OS Dashboard Arena");
        }

        // Check reduced-motion preferences
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            document.body.classList.add("reduce-motion");
        }
    }
}

window.a11yEngine = new A11yEngine();