// ===============================
// BARSA OS Terminal Engine
// ===============================

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function showMiniAgent() {
    const agent = document.getElementById("mini-agent");
    agent.classList.add("active");
}

function hideMiniAgent() {
    const agent = document.getElementById("mini-agent");
    agent.classList.remove("active");
}

async function typeLine(element, text) {
    for (let i = 0; i < text.length; i++) {
        element.innerHTML += text[i];
        await sleep(55);
    }
}

async function startBootSequence() {

    const bootText = document.getElementById("boot-text");

    // Clear terminal before starting
    bootText.innerHTML = "";

    try {

        const response = await fetch("./config/commands.json");
        const commands = await response.json();

        for (const line of commands.boot) {

            // Spawn mini Pac-Man
            showMiniAgent();

            // Small pause before typing
            await sleep(150);

            // Type one command
            await typeLine(bootText, "> " + line);

            // New line
            bootText.innerHTML += "\n";

            // Let user read it
            await sleep(500);

            // Mini Pac-Man disappears
            hideMiniAgent();

            // Pause before next command
            await sleep(250);

        }

    } catch (error) {

        console.error("Boot sequence failed:", error);

    }

}

window.addEventListener("DOMContentLoaded", () => {

    // Wait until the yellow Pac-Man has landed
    setTimeout(startBootSequence, 4500);

});