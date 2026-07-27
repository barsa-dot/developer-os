// =========================================
// BARSA OS — Command History Engine
// =========================================

class CommandHistoryEngine {
    constructor() {
        this.history = [];
        this.pointer = -1;
    }

    push(cmd) {
        if (cmd && cmd.trim()) {
            this.history.push(cmd.trim());
            this.pointer = this.history.length;
        }
    }

    attach(inputElem) {
        if (!inputElem) return;

        inputElem.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const val = inputElem.value;
                this.push(val);
                window.commandSystem.execute(val);
                inputElem.value = "";
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                if (this.pointer > 0) {
                    this.pointer--;
                    inputElem.value = this.history[this.pointer];
                }
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                if (this.pointer < this.history.length - 1) {
                    this.pointer++;
                    inputElem.value = this.history[this.pointer];
                } else {
                    this.pointer = this.history.length;
                    inputElem.value = "";
                }
            }
        });
    }
}

window.commandHistoryEngine = new CommandHistoryEngine();