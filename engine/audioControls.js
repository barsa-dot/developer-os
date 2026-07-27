// =========================================
// BARSA OS — Audio Control Center
// =========================================

class AudioControlEngine {
    constructor() {
        this.isMuted = false;
        this.volume = 0.5;
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (window.audioEngine) {
            window.audioEngine.setMute(this.isMuted);
        }
        window.interactiveTerminal.printLine(
            `[AUDIO]: Sound is now ${this.isMuted ? 'MUTED' : 'UNMUTED'}`,
            this.isMuted ? "#FF0000" : "#00FF00"
        );
    }

    setVolume(level) {
        this.volume = Math.max(0, Math.min(1, level));
        if (window.audioEngine) {
            window.audioEngine.setVolume(this.volume);
        }
        window.interactiveTerminal.printLine(`[AUDIO]: Volume set to ${Math.round(this.volume * 100)}%`);
    }
}

window.audioControlEngine = new AudioControlEngine();