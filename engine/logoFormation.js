// =========================================
// BARSA OS — Logo Formation Animation
// =========================================

class LogoFormationEngine {
    constructor() {
        // Normalized 5x5 matrix pixel maps for characters
        this.letterMap = {
            'B': [[1,1,1,0],[1,0,0,1],[1,1,1,0],[1,0,0,1],[1,1,1,0]],
            'A': [[0,1,1,0],[1,0,0,1],[1,1,1,1],[1,0,0,1],[1,0,0,1]],
            'R': [[1,1,1,0],[1,0,0,1],[1,1,1,0],[1,0,1,0],[1,0,0,1]],
            'S': [[0,1,1,1],[1,0,0,0],[0,1,1,0],[0,0,0,1],[1,1,1,0]],
            '.': [[0,0],[0,0],[0,0],[0,0],[1,1]]
        };
    }

    formLogo() {
        console.log("[LogoFormation] Transforming pellets into BARSA.DOT logo...");
        const pelletLayer = document.getElementById("pellet-layer");
        if (!pelletLayer) return;

        // Clear loose pellets and trigger glow pulse animation
        const pellets = pelletLayer.querySelectorAll(".pellet");
        pellets.forEach((p, idx) => {
            p.style.transition = "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
            p.style.transform = `scale(0)`;
            p.style.opacity = "0";
            setTimeout(() => p.remove(), 800);
        });

        // Form glowing title element in center arena
        const logoContainer = document.createElement("div");
        logoContainer.id = "barsa-logo-banner";
        logoContainer.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.5);
            font-family: 'Press Start 2P', monospace;
            font-size: 28px;
            color: #FFFF00;
            text-shadow: 0 0 10px #FFFF00, 0 0 20px #FF0000;
            opacity: 0;
            transition: all 1s ease-out;
            z-index: 10;
        `;
        logoContainer.innerText = "BARSA.DOT";
        pelletLayer.appendChild(logoContainer);

        requestAnimationFrame(() => {
            logoContainer.style.opacity = "1";
            logoContainer.style.transform = "translate(-50%, -50%) scale(1)";
        });
    }
}

window.logoFormationEngine = new LogoFormationEngine();