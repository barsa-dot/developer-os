const bootMessages = [
    "Initializing BARSA OS...",
    "Loading developer profile...",
    "Connecting GitHub...",
    "Loading repositories...",
    "Loading projects...",
    "Starting Developer Arcade..."
];

// Updated test execution for the mini agent animation sequence
async function typeBootMessages(){
    showMiniAgent();
    await sleep(1000);
    hideMiniAgent();
}

function showMiniAgent(){
    const agent = document.getElementById("mini-agent");
    agent.classList.add("active");
}

function hideMiniAgent(){
    const agent = document.getElementById("mini-agent");
    agent.classList.remove("active");
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startBootSequence() {
    const bootText = document.getElementById("boot-text");
    const miniAgent = document.getElementById("mini-agent");
    miniAgent.classList.add("active");
    
    try {
        const response = await fetch("./config/commands.json");
        const commands = await response.json();
        
        for (const line of commands.boot) {
            await typeLine(bootText, "> " + line);
            bootText.innerHTML += "\n";
            await wait(700);
        }
    } catch(error) {
        console.error("Boot sequence failed:", error);
    }
}

async function typeLine(element, text) {
    for (let i = 0; i < text.length; i++) {
        element.innerHTML += text[i];
        await wait(55);
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener("DOMContentLoaded", () => {
    // Temporarily testing the animation sequence immediately on load
    typeBootMessages();

    setTimeout(startBootSequence, 4500);
});