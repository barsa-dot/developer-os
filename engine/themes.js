// =========================================
// BARSA OS — Theme Engine
// =========================================

class ThemeEngine {
    constructor() {
        this.themes = {
            classic: { bg: "#000000", border: "#2121ff", text: "#FFFF00", highlight: "#00FF00" },
            cyberpunk: { bg: "#0d0221", border: "#ff007f", text: "#00f0ff", highlight: "#ffe600" },
            matrix: { bg: "#050505", border: "#00ff41", text: "#00ff41", highlight: "#003b00" },
            synthwave: { bg: "#1a002c", border: "#f35588", text: "#05dfd7", highlight: "#fff5a5" }
        };
    }

    apply(themeName = "classic") {
        const theme = this.themes[themeName.toLowerCase()] || this.themes.classic;
        document.body.style.backgroundColor = theme.bg;

        const frame = document.getElementById("arcade-frame");
        if (frame) {
            frame.style.borderColor = theme.border;
            frame.style.boxShadow = `0 0 20px ${theme.border}`;
        }

        const bootText = document.getElementById("boot-text");
        if (bootText) {
            bootText.style.color = theme.text;
        }

        console.log(`[ThemeEngine] Applied theme: ${themeName}`);
    }
}

window.themeEngine = new ThemeEngine();