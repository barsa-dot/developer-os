const text =
document.getElementById("boot-text");


const message =
"Initializing BARSA OS...";


let index = 0;



function type(){

    if(index < message.length){

        text.textContent += message[index];

        index++;

        setTimeout(type,80);

    }

}



setTimeout(type,1600);