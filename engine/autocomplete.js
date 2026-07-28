// =========================================
// BARSA OS — Autocomplete Engine
// =========================================

class AutocompleteEngine {
    constructor() {
        this.validCommands = ["help", "about", "projects", "github", "theme", "audio", "clear"];
    }

    attach(inputElem) {
        if (!inputElem) return;

        inputElem.addEventListener("keydown", (e) => {
            if (e.key === "Tab") {
                e.preventDefault();
                const currentText = inputElem.value.trim().toLowerCase();
                if (!currentText) return;

                const match = this.validCommands.find(c => c.startsWith(currentText));
                if (match) {
                    inputElem.value = match;
                }
            }
        });
    }
}

window.autocompleteEngine = new AutocompleteEngine();