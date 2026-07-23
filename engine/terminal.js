// ===============================
// BARSA OS Terminal Engine
// ===============================

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeLine(element, text) {
    for (let i = 0; i < text.length; i++) {
        element.innerHTML += text[i];
        await sleep(55);
    }
}

async function startBootSequence() {
    const bootText = document.getElementById("boot-text");
    if (!bootText) return;
    
    // Clear terminal stream
    bootText.innerHTML = "";
    
    try {
        const response = await fetch("./config/commands.json");
        const commands = await response.json();
        
        for (const line of commands.boot) {
            await typeLine(bootText, "> " + line);
            bootText.innerHTML += "\n";
            await sleep(450);
        }
    } catch (error) {
        console.error("Boot sequence failed:", error);
    }
}

// Expose explicitly for SceneManager
window.startBootSequence = startBootSequence;