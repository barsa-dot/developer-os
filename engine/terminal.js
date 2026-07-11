async function loadBootSequence() {
    try {
        // Load the boot commands
        const response = await fetch("./config/commands.json");
        const data = await response.json();

        // Find the boot text element
        const bootText = document.getElementById("boot-text");

        // Display only the first boot command for now
        bootText.textContent = data.boot[0];

    } catch (error) {
        console.error("Failed to load boot commands:", error);
    }
}

// Run after the page loads
window.addEventListener("DOMContentLoaded", loadBootSequence);