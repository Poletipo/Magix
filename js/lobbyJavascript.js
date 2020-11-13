let spriteList = [];

window.addEventListener("load", () =>{
    let buttons = document.querySelectorAll("button");
    buttons.forEach(btn => {
        btn.onclick = () =>{sendForm(btn.name)};
    })


    window.requestAnimationFrame(tick);
})
let lastTime = 0;
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

const sendForm = name =>{
    let formData = new FormData();
    formData.append("name", name);
    let privateKey = document.querySelector("#PRIVATE_KEY").value;
    if(privateKey != ""){
        console.log(privateKey);
        formData.append("privateKey", privateKey);
    }
    let username = document.querySelector("#observe").value;
    if(username != ""){
        console.log(username);
        formData.append("username", username);
    }

    console.log("tha name: " + name);

    fetch("lobbyAjax.php",{
        method : "POST",
        credentials : "include",
        body : formData
    })
    //.then(response => console.log(response))
    .then(() =>{
        if(name == "quitter"){
            window.location.href = "index.php";
        }
        if(name == "pratique" || name == "jouer" || 
            name == "pratiqueCoop" || name == "jouerCoop"){
            window.location.href = "jeu.php";
        }
        else if(name == "observer" && username != ""){
            window.location.href = "jeu.php";
        }
    })
}