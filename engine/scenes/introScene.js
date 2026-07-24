// ===============================
// BARSA OS — Intro Scene Module
// ===============================

class IntroScene {
    async enter() {
        console.log("[IntroScene] Starting intro animation...");
        // Wait for landing animation / power-on
        await new Promise(resolve => setTimeout(resolve, 4500));
        
        if (window.sceneManager) {
            window.sceneManager.switchTo("terminal");
        }
    }

    async exit() {
        console.log("[IntroScene] Exiting intro scene.");
    }
}

window.introScene = new IntroScene();