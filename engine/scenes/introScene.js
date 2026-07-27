// =========================================
// BARSA OS — Intro Boot Scene Orchestrator
// =========================================

class IntroScene {
    async enter() {
        console.log("[IntroScene] Starting automated boot sequence...");
        const terminal = document.getElementById("boot-text");

        const bootSteps = [
            "> INITIALIZING BARSA.DOT OS v2.0...",
            "> CONNECTING TO NETWORK SERVICES...",
            "> FETCHING DISCOVERY MODULES...",
            "> LOADING LIVE DASHBOARD..."
        ];

        for (let step of bootSteps) {
            if (terminal) {
                terminal.innerHTML += `\n${step}`;
            }
            await new Promise(r => setTimeout(r, 600));
        }

        this.completeBoot();
    }

    completeBoot() {
        console.log("[IntroScene] Boot complete. Transforming to Dashboard...");

        // 1. Form Logo
        if (window.logoFormationEngine) window.logoFormationEngine.formLogo();

        // 2. Morph maze into dashboard grid
        if (window.dashboardTransformEngine) window.dashboardTransformEngine.transform();

        // 3. Render live widgets for barsa-dot
        if (window.dashboardRenderer) window.dashboardRenderer.renderProfile("barsa-dot");
        if (window.activityCenter) window.activityCenter.render("barsa-dot");
        if (window.repositoryShowcase) window.repositoryShowcase.render("barsa-dot");

        // 4. Focus interactive terminal
        const cliInput = document.getElementById("cli-input");
        if (cliInput) cliInput.focus();
    }
}

window.introScene = new IntroScene();