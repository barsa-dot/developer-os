document.getElementById("boot-text");
async function startBootSequence() {

    const bootText =
    document.getElementById("boot-text");


    try {

        const response =
        await fetch("./config/commands.json");


        const commands =
        await response.json();


        for (const line of commands.boot) {


            bootText.textContent +=
            "> " + line + "\n";


            await wait(1000);

        }


    }

    catch(error){

        console.error(
        "Boot sequence failed:",
        error
        );

    }

}



function wait(ms){

    return new Promise(
        resolve => setTimeout(resolve,ms)
    );

}



window.addEventListener(
"DOMContentLoaded",
()=>{

    setTimeout(
        startBootSequence,
        4500
    );

});