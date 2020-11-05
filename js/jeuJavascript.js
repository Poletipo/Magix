let spriteList = [];

window.addEventListener("load", () => {

    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
    window.requestAnimationFrame(tick);
})

let lastTime = 0;
let deltaTick = 0;

const tick = timeSpan =>{
    deltaTick =  (timeSpan - lastTime) / 1000;
    lastTime = timeSpan;

    for (let i = 0; i < spriteList.length; i++) {
        const element = spriteList[i];
        let alive = element.tick(deltaTick);

        if (!alive) {
            spriteList.splice(i, 1);
            i--;
        }
    }

    window.requestAnimationFrame(tick);

}

const state = () => {
    fetch("jeuAjax-state.php",{
        method : "POST",
        credentials : "include"
    })
    .then (response => response.json())
    .then( data => { 
        console.log(data);
        //let reponse = JSON.parse(data);

        //console.log(reponse); // contient les cartes/état du jeu.

    setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    })
}

window.addEventListener("load", () => {

});
