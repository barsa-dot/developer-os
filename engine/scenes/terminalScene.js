// ===============================
// BARSA OS — Terminal Scene
// ===============================

class TerminalScene {
    async enter() {
        console.log("[TerminalScene] Booting sequence...");
        if (typeof window.startBootSequence === 'function') {
            await window.startBootSequence();
        }
    }

    async exit() {
        console.log("[TerminalScene] Boot stream completed.");
    }
}

window.terminalScene = new TerminalScene();