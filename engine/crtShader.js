// =========================================
// BARSA OS — CRT Shader & Scanline Engine
// =========================================

class CRTShaderEngine {
    init() {
        console.log("[CRTShaderEngine] Initializing retro CRT overlays...");
        const frame = document.getElementById("arcade-frame");
        if (!frame) return;

        let crtOverlay = document.getElementById("crt-overlay");
        if (!crtOverlay) {
            crtOverlay = document.createElement("div");
            crtOverlay.id = "crt-overlay";
            crtOverlay.className = "crt-screen-overlay";
            frame.appendChild(crtOverlay);
        }
    }
}

window.crtShaderEngine = new CRTShaderEngine();