/**
 * BARSA OS v2 - Developer Console Core Engine
 * Manages procedural generation arrays, loading meters, and direct HUD binding logic.
 */

const TerminalEngine = (() => {
    // Cinematic Boot Logs Sequence Dataset
    const bootSequence = [
        { text: "SYSTEM: INITIALIZING CORE BOOT MATRIX MODULE...", type: "system" },
        { text: "[██████████] 100% COMPLETE", type: "status", delay: 400 },
        { text: "SYSTEM: LOADING SECURITY RUNTIME STORAGE...", type: "system" },
        { text: "STORAGE: ALLOCATING CORE PORTFOLIO ENGINE SEGMENTS...", type: "accent" },
        { text: "CONNECTING REMOTES: GITHUB DATA STREAM VIA API...", type: "system" },
        { text: "NETWORK: ACCESS GRANTED CONNECTIVITY VERIFIED ✓", type: "status", delay: 500 },
        { text: "SKILLS: COMPILING TECHNOLOGY MATRICES...", type: "system" },
        { text: "COMPILATION: 24 DEPENDENCIES LINKED SUCCESSFULLY ✓", type: "status" },
        { text: "\n==============================================", type: "accent" },
        { text: "WELCOME TO BARSA OS v2.0 - ARCHITECTURE COMPLIANT", type: "status" },
        { text: "INTERACTION DISPATCH INTERFACE ONLINE.", type: "system" },
        { text: "==============================================\n", type: "accent" },
        { text: "Type 'help' inside system node prompt console to query datasets.", type: "accent" }
    ];

    const commandRegistry = {
        "help": "<span class=\"tag-system\">Available Operations Matrix:</span>\n - about      : Structural overview of engineering paradigms\n - projects   : Active terminal software repositories\n - skills     : Technology and logic stack grids\n - clear      : Flush existing terminal visibility blocks",
        "about": "BARSA OS [Version 2.0.0]\nEngineered down to pure vanilla components. Focus metrics: low resource consumption profiles, sub-millisecond execution times, and immersive UI styles.",
        "projects": "<span class=\"tag-status\">Active Engineering Log Modules:</span>\n - 01. VEDIC AI  : Full-stack engine backed via FastAPI layer\n - 02. CAMPUS TRK: Token visibility controller interface\n - 03. SHOP ECOM : High performance transactional environment",
        "skills": "<span class=\"tag-system\">Languages:</span> C, Embedded Assembly, JavaScript (ES6+), Python\n<span class=\"tag-system\">Frameworks:</span> React, Vite, FastAPI, Node.js, Appwrite\n<span class=\"tag-system\">Data Science:</span> Pandas, Matplotlib, Seaborn",
        "clear": ""
    };

    let textContainer = null;
    let sequenceIndex = 0;
    let inputBuffer = "";

    const initialize = () => {
        textContainer = document.getElementById('boot-text');
        if (!textContainer) return;

        // Run direct dynamic HUD text update configuration inject binding loop
        animateHUDNumbers();

        // Begin sequence rendering routine
        processBootSequence();
    };

    const animateHUDNumbers = () => {
        const config = window.BarsaConfig || { hudData: { projects: 8, stack: 12, commits: 342 } };
        
        // Target animations tracking configurations smoothly
        animateCounter("hud-projects", config.hudData.projects, 1200);
        animateCounter("hud-stack", config.hudData.stack, 1400);
        animateCounter("hud-commits", config.hudData.commits, 1800);
    };

    const animateCounter = (id, target, duration) => {
        const el = document.getElementById(id);
        if (!el) return;
        
        let start = 0;
        const increment = target / (duration / 16);
        
        const update = () => {
            start += increment;
            if (start >= target) {
                el.innerText = target.toString().padStart(id === 'hud-commits' ? 3 : 2, '0');
            } else {
                el.innerText = Math.floor(start).toString().padStart(id === 'hud-commits' ? 3 : 2, '0');
                requestAnimationFrame(update);
            }
        };
        requestAnimationFrame(update);
    };

    const processBootSequence = () => {
        if (sequenceIndex < bootSequence.length) {
            const line = bootSequence[sequenceIndex];
            typeLine(line.text, line.type, () => {
                sequenceIndex++;
                setTimeout(processBootSequence, line.delay || 250);
            });
        } else {
            unlockTerminalConsole();
        }
    };

    const typeLine = (text, typeClass, callback) => {
        let charIndex = 0;
        const spanNode = document.createElement('span');
        spanNode.className = `tag-${typeClass}`;
        textContainer.appendChild(spanNode);

        const typeChar = () => {
            if (charIndex < text.length) {
                spanNode.innerHTML += text.charAt(charIndex);
                charIndex++;
                
                // Track standard typing cadence bounds
                setTimeout(typeChar, Math.random() * (25 - 8) + 8);
            } else {
                textContainer.appendChild(document.createTextNode('\n'));
                // Continually drop scroll viewing window down
                const parent = textContainer.parentElement;
                parent.scrollTop = parent.scrollHeight;
                if (callback) callback();
            }
        };
        typeChar();
    };

    const unlockTerminalConsole = () => {
        const startPrompt = document.getElementById('start-prompt');
        if (startPrompt) {
            startPrompt.innerText = "PRESS START TO ENTER";
            startPrompt.classList.add('active');
        }

        textContainer.appendChild(document.createTextNode('BARSA-OS:~$ '));
        window.addEventListener('keydown', handleConsoleInput);
    };

    const handleConsoleInput = (e) => {
        if (sequenceIndex < bootSequence.length) return;

        const parent = textContainer.parentElement;

        if (e.key === 'Enter') {
            const command = inputBuffer.trim().toLowerCase();
            textContainer.appendChild(document.createTextNode('\n'));

            if (command === 'clear') {
                textContainer.innerHTML = 'BARSA-OS:~$ ';
            } else if (commandRegistry.hasOwnProperty(command)) {
                const responseNode = document.createElement('div');
                responseNode.innerHTML = commandRegistry[command] + '\n';
                textContainer.appendChild(responseNode);
                textContainer.appendChild(document.createTextNode('BARSA-OS:~$ '));
            } else if (command !== "") {
                textContainer.appendChild(document.createTextNode(`Error: Unrecognized command matrix node '${command}'. Type 'help'.\nBARSA-OS:~$ `));
            } else {
                textContainer.appendChild(document.createTextNode('BARSA-OS:~$ '));
            }

            inputBuffer = "";
            parent.scrollTop = parent.scrollHeight;
        } else if (e.key === 'Backspace') {
            if (inputBuffer.length > 0) {
                inputBuffer = inputBuffer.slice(0, -1);
                // Remove trailing node structure safely
                textContainer.innerHTML = textContainer.innerHTML.slice(0, -1);
            }
        } else if (e.key.length === 1) {
            inputBuffer += e.key;
            textContainer.appendChild(document.createTextNode(e.key));
            parent.scrollTop = parent.scrollHeight;
        }
    };

    document.addEventListener('DOMContentLoaded', initialize);
})();