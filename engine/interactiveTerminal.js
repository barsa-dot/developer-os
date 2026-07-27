// =========================================
// BARSA OS — Interactive Terminal Engine
// =========================================

class InteractiveTerminal {
    constructor() {
        this.inputContainer = null;
        this.inputField = null;
    }

    init() {
        const statusBar = document.getElementById("status-bar");
        if (!statusBar) return;

        // Remove press-start prompt and append interactive CLI line
        const pressStart = document.getElementById("press-start");
        if (pressStart) pressStart.style.display = "none";

        let cliBox = document.getElementById("cli-box");
        if (!cliBox) {
            cliBox = document.createElement("div");
            cliBox.id = "cli-box";
            cliBox.style.cssText = `
                display: flex;
                align-items: center;
                background: #000;
                border-top: 2px solid #2121ff;
                padding: 6px 12px;
                font-family: 'Courier New', monospace;
                color: #00FF00;
            `;
            cliBox.innerHTML = `
                <span style="margin-right: 8px; font-weight: bold; color: #FFFF00;">visitor@barsa-os:~$</span>
                <input type="text" id="cli-input" placeholder="type 'help'..." style="
                    flex: 1;
                    background: transparent;
                    border: none;
                    outline: none;
                    color: #00FF00;
                    font-family: inherit;
                    font-size: 14px;
                " autofocus />
            `;
            statusBar.appendChild(cliBox);
        }

        this.inputField = document.getElementById("cli-input");
    }

    printLine(text, color = "#00FF00") {
        const terminal = document.getElementById("boot-text");
        if (!terminal) return;
        terminal.innerHTML += `\n<span style="color: ${color};">${text}</span>`;
        terminal.scrollTop = terminal.scrollHeight;
    }
}

window.interactiveTerminal = new InteractiveTerminal();