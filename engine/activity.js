// =========================================
// BARSA OS — Activity Discovery Module
// =========================================

class ActivityModule {
    constructor() {
        this.activity = {
            latestCommit: "feat: implement arcade audio engine",
            latestPush: "main branch @ reva-campus-tokens",
            contributionCount: "148 contributions this term",
            currentProject: "Vedic AI & BARSA OS Platform"
        };
    }

    scan() {
        console.log("[ActivityModule] Scanning /activity...");
        const terminal = document.getElementById("boot-text");
        if (!terminal) return;

        terminal.innerHTML += `\n> [DEVELOPER ACTIVITY SCAN]:\n`;
        terminal.innerHTML += `> LATEST COMMIT: ${this.activity.latestCommit}\n`;
        terminal.innerHTML += `> LATEST PUSH:   ${this.activity.latestPush}\n`;
        terminal.innerHTML += `> CONTRIBUTIONS: ${this.activity.contributionCount}\n`;
        terminal.innerHTML += `> ACTIVE BUILD:  ${this.activity.currentProject}\n`;
    }
}

window.activityModule = new ActivityModule();