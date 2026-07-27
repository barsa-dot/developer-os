// =========================================
// BARSA OS — Command Router & Execution
// =========================================

class CommandSystem {
    constructor() {
        this.commands = {
            help: "Available commands:\n  * help      - Display available commands\n  * about     - Learn about developer identity\n  * projects  - Showcase built products\n  * github    - Open official GitHub profile\n  * resume    - Download or view official resume",
            about: "BARSA OS v2.0\nDeveloper: Full-stack & Low-Level Systems Enthusiast\nTech Stack: JavaScript/React, FastAPI, C, Python",
            projects: "Featured Repositories:\n  1. reva-campus-tokens - Campus utility app\n  2. vedic-ai-backend   - Conversational AI engine\n  3. barsa-os           - Arcade Portfolio OS",
            github: "Opening GitHub profile in external tab...",
            resume: "Fetching latest resume file link..."
        };
    }

    execute(cmdRaw) {
        const cmd = cmdRaw.trim().toLowerCase();
        if (!cmd) return;

        window.interactiveTerminal.printLine(`visitor@barsa-os:~$ ${cmdRaw}`, "#FFFF00");

        if (cmd === "github") {
            window.interactiveTerminal.printLine(this.commands.github);
            window.open("https://github.com", "_blank");
            return;
        }

        if (cmd === "resume") {
            window.interactiveTerminal.printLine(this.commands.resume);
            window.interactiveTerminal.printLine("-> Resume downloaded/ready.", "#00FFFF");
            return;
        }

        if (this.commands[cmd]) {
            window.interactiveTerminal.printLine(this.commands[cmd]);
        } else {
            window.interactiveTerminal.printLine(`Command not found: '${cmd}'. Type 'help' for available options.`, "#FF0000");
        }
    }
}

window.commandSystem = new CommandSystem();