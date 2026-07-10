const text =
"Initializing BARSA OS...";


const output =
document.getElementById("boot-text");


let i = 0;


function type(){

    if(i < text.length){

        output.innerHTML += text[i];

        i++;

        setTimeout(type,80);

    }

}


setTimeout(type,1500);