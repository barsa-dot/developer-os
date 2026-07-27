// =========================================
// BARSA OS — Intro Boot Scene Orchestrator
// =========================================

class IntroScene {
    async enter() {
        console.log("[IntroScene] Coin Inserted. Starting boot sequence...");
        const terminal = document.getElementById("boot-text");
        const logStep = (msg) => {
            if (terminal) {
                terminal.innerText += `\n${msg}`;
                terminal.scrollTop = terminal.scrollHeight;
            }
        };

        const delay = (ms) => new Promise(res => setTimeout(res, ms));

        // 1. CRT Boots
        logStep("> [1/12] CRT BOOTS...");
        if (window.crtShaderEngine) window.crtShaderEngine.init();
        await delay(500);

        // 2. Arcade Arena
        logStep("> [2/12] BUILDING ARCADE ARENA...");
        if (window.mazeEngine) window.mazeEngine.render();
        if (window.pelletEngine) window.pelletEngine.generate();
        await delay(500);

        // 3. Pac-Man + Ghosts
        logStep("> [3/12] SPAWNING PAC-MAN & GHOSTS...");
        const pacImg = document.getElementById("pacman");
        if (pacImg) pacImg.style.display = "block";

        if (window.pacmanEngine) {
            window.pacmanEngine.init();
            if (typeof window.pacmanEngine.startPatrol === 'function') window.pacmanEngine.startPatrol();
        }
        if (window.ghostEngine) {
            window.ghostEngine.spawn();
            if (typeof window.ghostEngine.startPatrol === 'function') window.ghostEngine.startPatrol();
        }
        await delay(600);

        // 4. Developer Scan Begins
        logStep("> [4/12] DEVELOPER SCAN BEGINS...");
        await delay(500);

        // 5. Identity Found
        logStep("> [5/12] IDENTITY FOUND: BARSA (@barsa-dot)");
        if (window.dashboardRenderer) window.dashboardRenderer.renderProfile("barsa-dot");
        await delay(500);

        // 6. Skills Indexed
        logStep("> [6/12] SKILLS INDEXED: [JavaScript, FastAPI, C, Python]");
        await delay(500);

        // 7. Repositories Synced
        logStep("> [7/12] REPOSITORIES SYNCED...");
        if (window.repositoryShowcase) window.repositoryShowcase.render("barsa-dot");
        await delay(500);

        // 8. Activity Loaded
        logStep("> [8/12] ACTIVITY LOADED...");
        if (window.activityCenter) window.activityCenter.render("barsa-dot");
        await delay(500);

        // 9. Achievements Unlocked
        logStep("> [9/12] ACHIEVEMENTS UNLOCKED...");
        if (window.achievementPopupEngine) window.achievementPopupEngine.trigger("SYSTEM_BOOT", "BARSA OS Initialized!");
        await delay(600);

        // 10. BARSA.DOT Logo Forms
        logStep("> [10/12] BARSA.DOT LOGO FORMS...");
        if (window.logoFormationEngine) window.logoFormationEngine.formLogo();
        await delay(700);

        // 11. Arena Becomes Dashboard
        logStep("> [11/12] ARENA BECOMES DASHBOARD...");
        if (window.dashboardTransformEngine) window.dashboardTransformEngine.transform();
        await delay(600);

        // 12. Terminal Unlocks & Interactive Portfolio Ready
        logStep("> [12/12] TERMINAL UNLOCKED. PORTFOLIO READY!");
        const cliBox = document.getElementById("cli-box");
        if (cliBox) cliBox.style.display = "flex";

        const cliInput = document.getElementById("cli-input");
        if (cliInput) cliInput.focus();

        if (window.interactiveTerminal) window.interactiveTerminal.init();
    }
}

window.introScene = new IntroScene();