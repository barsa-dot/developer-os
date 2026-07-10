const logo =
document.getElementById("barsa-logo");


const terminal =
document.getElementById("terminal-line");


const text =
document.getElementById("boot-text");


const message =
"Initializing BARSA OS...";


let index = 0;



function startTerminal(){


terminal.style.opacity = "1";


typeText();


}



function typeText(){


if(index < message.length){


text.textContent += message[index];


index++;


setTimeout(typeText,80);


}


}



setTimeout(startTerminal,4000);