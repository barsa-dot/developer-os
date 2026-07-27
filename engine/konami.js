// =========================================
// BARSA OS — Konami Code Trigger
// =========================================

class KonamiEngine {
    constructor() {
        this.sequence = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
        this.index = 0;
    }

    listen() {
        window.addEventListener("keydown", (e) => {
            const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
            const required = this.sequence[this.index].toLowerCase();

            if (key === required) {
                this.index++;
                if (this.index === this.sequence.length) {
                    this.unlockSecret();
                    this.index = 0;
                }
            } else {
                this.index = 0;
            }
        });
    }

    unlockSecret() {
        if (window.interactiveTerminal) {
            window.interactiveTerminal.printLine("★ [SECRET UNLOCKED]: KONAMI CODE ACTIVATED! ★", "#FFFF00");
            window.interactiveTerminal.printLine("-> 30 LIVES ADDED / ARCADE CHEAT MODE ENABLED", "#00FF00");
        }
        if (window.miniGameEngine) {
            window.miniGameEngine.launch();
        }
    }
}

window.konamiEngine = new KonamiEngine();