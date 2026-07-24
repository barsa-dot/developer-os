// =========================================
// BARSA OS — Skills Discovery Module
// =========================================

class SkillsModule {
    constructor() {
        this.skillTree = {
            languages: ["JavaScript/TypeScript", "Python", "C/C++", "HTML/CSS"],
            frameworks: ["React", "FastAPI", "Vite", "Node.js"],
            tools: ["Appwrite", "Git/GitHub", "Pandas", "Matplotlib"]
        };
    }

    analyze() {
        console.log("[SkillsModule] Analyzing repository stack at /skills...");
        const terminal = document.getElementById("boot-text");
        if (!terminal) return;

        terminal.innerHTML += `\n> [SKILLS ANALYZED]:\n`;
        terminal.innerHTML += `> LANGUAGES:  ${this.skillTree.languages.join(", ")}\n`;
        terminal.innerHTML += `> FRAMEWORKS: ${this.skillTree.frameworks.join(", ")}\n`;
        terminal.innerHTML += `> TOOLS:      ${this.skillTree.tools.join(", ")}\n`;
    }
}

window.skillsModule = new SkillsModule();