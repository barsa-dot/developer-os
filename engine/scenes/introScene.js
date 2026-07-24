// =========================================
// BARSA OS — Timeline Intro Sequence
// =========================================

class IntroScene {
    async enter() {
        console.log("[IntroScene] Timeline sequence engaged.");

        // Audio unlock listener
        if (window.audioEngine) window.audioEngine.init();

        // 1. Play CRT Sound & Flash
        if (window.audioEngine) window.audioEngine.playCrtPowerOn();
        await this.delay(600);

        // 2. Play Startup Beeps
        if (window.audioEngine) {
            window.audioEngine.playBeep(440, 0.1);
            await this.delay(150);
            window.audioEngine.playBeep(880, 0.15);
        }

        await this.delay(1000);

        // 3. Hand off control directly to Terminal Scene
        if (window.sceneManager) {
            window.sceneManager.switchTo("terminal");
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async exit() {
        console.log("[IntroScene] Sequence finished.");
    }
}

window.introScene = new IntroScene();