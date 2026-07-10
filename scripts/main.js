const bootOutput = document.getElementById("boot-output");

const bootSequence = [
    "Initializing BARSA OS...",
    "Loading Developer Core...",
    "Synchronizing GitHub...",
    "Preparing Workspace...",
    "Launching Terminal..."
];

let line = 0;

function typeLine() {

    if (line >= bootSequence.length) {
        return;
    }

    const current = bootSequence[line];

    let character = 0;

    const paragraph = document.createElement("div");

    bootOutput.appendChild(paragraph);

    function typeCharacter() {

        if (character < current.length) {

            paragraph.textContent += current.charAt(character);

            character++;

            setTimeout(typeCharacter, 35);

        } else {

            line++;

            setTimeout(typeLine, 300);

        }

    }

    typeCharacter();

}

window.onload = () => {

    setTimeout(typeLine, 700);

};