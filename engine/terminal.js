/**
 * BARSA OS v2 - Interactive Shell Command Environment System Router
 */

const TerminalRouter = (() => {
    let inputNode = null;
    let loggerNode = null;

    const COMMAND_MATRIX = {
        help: "Output operational parameters and available secure hooks.",
        about: "Developer OS Framework v2.0 // Managed by First Year Engineering.",
        projects: "Active Clusters: [vedic-ai-core], [reva-token-ledger], [jewelry-shop-v2].",
        skills: "Loaded Modules: JavaScript, TypeScript, Python, FastAPI, React, C Programming.",
        github: "Active Target Node synchronized with verified accounts securely.",
        resume: "Binary compiled. Target download payload standard: path/to/portfolio.pdf",
        contact: "Signal frequencies active. Target routing node: dev@barsa.dot",
        clear: "Purge terminal line logs."
    };

    const init = () => {
        inputNode = document.getElementById('term-input');
        loggerNode = document.getElementById('term-log');

        if(inputNode) {
            inputNode.addEventListener('keydown', handleCommandSubmit);
        }
    };

    const handleCommandSubmit = (e) => {
        if (e.key !== 'Enter') return;
        
        const rawCmd = inputNode.value.trim();
        inputNode.value = "";
        if (!rawCmd) return;

        printLine(`barsa@developer-os:~$ ${rawCmd}`, 'prompt-echo');
        processCommand(rawCmd.toLowerCase());
    };

    const processCommand = (cmd) => {
        if (cmd === 'clear') {
            loggerNode.innerHTML = "";
            return;
        }

        if (COMMAND_MATRIX[cmd]) {
            printLine(COMMAND_MATRIX[cmd], 'system-response');
        } else {
            printLine(`Command not found: '${cmd}'. Type 'help' for core subsystem index lists.`, 'error-response');
        }
    };

    const printLine = (text, className) => {
        const row = document.createElement('div');
        row.className = `term-line ${className || ''}`;
        row.style.margin = "4px 0";
        row.innerText = text;
        loggerNode.appendChild(row);
        loggerNode.scrollTop = loggerNode.scrollHeight;
    };

    document.addEventListener('DOMContentLoaded', init);
})();