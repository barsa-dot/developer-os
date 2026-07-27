// =========================================
// BARSA OS — Command Router & Execution
// =========================================

class CommandSystem {
    constructor() {
        this.commands = {
            help: "Available commands:\n  * help      - Display available commands\n  * about     - Learn about developer identity\n  * projects  - Showcase built products\n  * github    - Open official GitHub profile",
            about: "BARSA OS v2.0\nDeveloper: Full-stack & Low-Level Systems Enthusiast\nTech Stack: JavaScript/React, FastAPI, C, Python",
            projects: "Featured Repositories:\n  1. reva-campus-tokens - Campus utility app\n  2. vedic-ai-backend   - Conversational AI engine\n  3. barsa-os           - Arcade Portfolio OS",
            github: "Opening GitHub profile in external tab..."
        };
    }

    execute(cmdRaw) {
        const cmd = cmdRaw.trim().toLowerCase();
        if (!cmd) return;

        // Print typed command to terminal screen
        window.interactiveTerminal.printLine(`visitor@barsa-os:~$ ${cmdRaw}`, "#FFFF00");

        // 1. Check for Developer Easter Eggs (Phase 5)
        if (window.easterEggEngine && window.easterEggEngine.check(cmd)) {
            return;
        }

        // 2. Open Specific GitHub Profile
        if (cmd === "github") {
            window.interactiveTerminal.printLine(this.commands.github);
            const githubUrl = window.githubEngine?.profileUrl || "https://github.com/barsa-dot";
            window.open(githubUrl, "_blank");
            return;
        }

        // 3. Default Commands
        if (this.commands[cmd]) {
            window.interactiveTerminal.printLine(this.commands[cmd]);
        } else {
            window.interactiveTerminal.printLine(`Command not found: '${cmd}'. Type 'help' for available options.`, "#FF0000");
        }
    }
}

window.commandSystem = new CommandSystem();