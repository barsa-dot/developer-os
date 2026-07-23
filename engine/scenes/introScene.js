// ===============================
// BARSA OS — Intro Scene
// ===============================

class IntroScene {
    async enter() {
        console.log("[IntroScene] Powering on arcade frame...");
        const arcadeFrame = document.getElementById("arcade-frame");
        if (arcadeFrame) {
            arcadeFrame.classList.add("power-on");
        }

        // Wait for power-on animation duration before starting terminal boot
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (window.sceneManager) {
            window.sceneManager.switchTo("terminal");
        }
    }

    async exit() {
        console.log("[IntroScene] Completed.");
    }
}

window.introScene = new IntroScene();