// =========================================
// BARSA OS — Developer Easter Eggs
// =========================================

class EasterEggEngine {
    constructor() {
        this.eggs = {
            vedic: "🕉️ Vedic AI Engine: Directing conversational intelligence to daily wisdom...",
            reva: "🎓 REVA Campus Tokens: Accessing student token ecosystem...",
            godmode: "⚡ GOD MODE ENABLED: Pac-Man is now invulnerable to ghosts."
        };
    }

    check(cmd) {
        const clean = cmd.trim().toLowerCase();
        if (this.eggs[clean]) {
            window.interactiveTerminal.printLine(this.eggs[clean], "#FFB8FF");
            if (clean === "godmode" && window.pacmanEngine) {
                window.pacmanEngine.isInvincible = true;
            }
            return true;
        }
        return false;
    }
}

window.easterEggEngine = new EasterEggEngine();