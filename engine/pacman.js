console.log("PACMAN JS LOADED");


function startPacmanAnimation(){

    const pacman =
    document.getElementById("pacman");


    console.log("Pacman element:", pacman);


    if(!pacman){
        console.log("Pacman not found");
        return;
    }


    pacman.classList.add(
        "pacman-moving"
    );

}


window.addEventListener(
"DOMContentLoaded",
()=>{

    console.log("DOM READY");


    setTimeout(
        startPacmanAnimation,
        2500
    );

});