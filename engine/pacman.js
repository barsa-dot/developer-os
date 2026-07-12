function startPacmanAnimation(){

    const pacman =
    document.getElementById("pacman");


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

    setTimeout(
        startPacmanAnimation,
        2500
    );

});