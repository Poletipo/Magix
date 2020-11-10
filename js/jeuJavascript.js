
let spriteList = [];
let timer;
let timerSprite;
let enemyName;
let enemyClass;
let enemyMana;
let enemyVie;
let enemyRemainingCard;
let playerMana;
let playerVie;
let playerRemainingCard;
let playerIcon;

let gameState;

let carteTemplate;

let playerBoard;
let shadowCard = null;

let myTurn = false;

let uid = null;
let uidTarget = null;

window.addEventListener("load", () => {
    timer = document.querySelector(".time-valeur");
    timerSprite = document.querySelector(".time-sablier");
    enemyName = document.querySelector(".enemy-name");
    enemyClass = document.querySelector(".enemy-class");
    enemyMana = document.querySelector(".enemy-mana-valeur");
    enemyVie = document.querySelector(".enemy-vie-valeur");
    enemyRemainingCard = document.querySelector(".enemy-cartesRestanteValeur");
    playerIcon = document.querySelector(".enemy-picture");
    playerIcon.addEventListener("mouseover", evt=>{
        hover(evt, playerIcon);
    });
    playerIcon.addEventListener("mouseout", evt=>{
        notHover(evt);
    });
    
    playerMana = document.querySelector(".player-mana-valeur");
    playerVie = document.querySelector(".player-vie-valeur");
    playerRemainingCard = document.querySelector(".player-cartesRestanteValeur");
    
    carteTemplate = document.querySelector(".carte").innerHTML;

    playerBoard = document.querySelector(".player-play-side");
    gameState = document.querySelector(".game-state");

    playerBoard.addEventListener("mouseover", evt=>{
        hover(evt, playerBoard);
    });
    playerBoard.addEventListener("mouseout", evt=>{
        notHover(evt);
    });

    /*------------BUTTONS------------*/
    let buttons = document.querySelectorAll("button");
    buttons.forEach(btn => {
        btn.onclick = () =>{bouton(btn)};
    })

    document.addEventListener("mousemove", evt => {mouseMove(evt);});
    document.addEventListener("mouseup", evt => {mouseUp(evt);});

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
        //console.log(data["yourTurn"]);
        let stateText = null;
        console.log(data);
        if(data == "WAITING"){
            stateText = "Waiting...";
        }
        else if(data == "LAST_GAME_WON"){
            stateText = "Game Won";
        }
        else if(data == "LAST_GAME_LOST"){
            stateText = "Game Lost";
        }
        else if(data == "NOT_IN_GAME"){
            stateText = "Player Not in Game";
        }
        
        if(stateText){
            gameState.style.display = "flex";
            gameState.querySelector(".game-state-text").innerText = stateText;
            if(stateText != "Waiting..."){
                gameState.querySelector(".btn-quitter").style.display = "block";
                if(stateText == "Game Won"){
                    enemyVie.innerText = "0";
                    
                }else if(stateText == "Game Lost"){
                    console.log("lost");
                    playerVie.innerText = "0";
                    gameState.querySelector(".game-state-text").style.color = "red";
                }
            }
            else{
                gameState.querySelector(".btn-quitter").style.display = "none";
                
            }
        }else{
            gameState.style.display = "none";
        }

        let btnHeroPower = document.querySelector("#btn-HeroPower");
        let btnEndTurn = document.querySelector("#btn-EndTurn");
        
        
        btnEndTurn.disabled = true;
        btnHeroPower.disabled = true;
        if(data["yourTurn"] != undefined){
            myTurn = data["yourTurn"];
            
            
            //---------TIME--------
            timer.innerText = data["remainingTurnTime"];
            if(data["yourTurn"]){
                timer.style.color = "rgb(0, 255, 136)";
                if(!data["heroPowerAlreadyUsed"] && data["mp"] >=2){
                    btnHeroPower.disabled = false;   
                }
                btnEndTurn.disabled = false;
                timerSprite.style.transform = "rotate(0.5turn)";
            }
            else{
                timer.style.color = "#ffbf00";
                timerSprite.style.transform = "rotate(0deg)";
            }
    
            //----------ENEMY------------
            enemyName.innerText = data["opponent"]["username"];
            enemyClass.innerText = data["opponent"]["heroClass"];
            enemyMana.innerText = data["opponent"]["mp"];
            enemyVie.innerText = data["opponent"]["hp"];
            if(stateText == "Game Won"){
                enemyVie.innerText = "0";
            }
            enemyRemainingCard.innerText = data["opponent"]["remainingCardsCount"];
            
            let enemyCardHand = document.querySelector(".enemy-side-cartesEnMain");
            enemyCardHand.innerHTML = '';
            for(let i=0;i<data["opponent"]["handSize"];i++){
                let node = document.createElement("div");
                node.className = "enemy-unturned-card";
                enemyCardHand.appendChild(node);
            }
            let enemyPlaySide = document.querySelector(".enemy-play-side");
            enemyPlaySide.innerHTML = '';
            for(let i = 0;i<data["opponent"]["board"].length;i++){
                let node = createCard(data["opponent"]["board"][i]);
                node.addEventListener("mouseover", evt => {hover(evt,node);});
                node.addEventListener("mouseout", evt => {notHover(evt);});
                enemyPlaySide.appendChild(node);
            }
            
            //-----------PLAYER------------
            playerMana.innerText = data["mp"];
            playerVie.innerText = data["hp"];
            if(stateText == "Game Lost"){
                playerVie.innerText = "0";
            }
            playerRemainingCard.innerText = data["remainingCardsCount"];
            /*----------BOARD--------*/
            let playerPlaySide = document.querySelector(".player-play-side");
            playerPlaySide.innerHTML = '';
            for(let i = 0;i<data["board"].length;i++){
                let node = createCard(data["board"][i]);
                if(uid != null && node.id == uid.id){
                    node.style.opacity = 0;
                }
                node.addEventListener("mousedown", evt =>{clickCarte(evt,node);});
                playerPlaySide.appendChild(node);
            }
            /*----------HAND------------*/
            let playerHand = document.querySelector(".player-side-cartesEnMain");
            playerHand.innerHTML = '';
            for(let i = 0;i<data["hand"].length;i++){
                let node = createCard(data["hand"][i]);
                if(uid != null && node.id == uid.id){
                    node.style.opacity = 0;
                }
                node.addEventListener("mousedown", evt =>{clickCarte(evt,node);});
                playerHand.appendChild(node);
            }
        }

        //console.log(reponse); // contient les cartes/état du jeu.
    
    setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    })
}



const createCard = info =>{
    let node = document.createElement("div");
    node.className = "carte";
    node.setAttribute("uid", info["id"]);
    node.innerHTML = carteTemplate;
    node.querySelector(".carte-mana-valeur").innerText = info["cost"]; 
    node.querySelector(".carte-vie-valeur").innerText = info["hp"]; 
    node.querySelector(".carte-attack-valeur").innerText = info["atk"];
    node.querySelector(".carte-state").innerText = info["state"];

    if(info["state"] == "IDLE"){
        node.style.boxShadow = "0 0 0.5vh 0.1vh orange";
    }
    
    for(let i=0;i<info["mechanics"].length;i++){
        if(i == (info["mechanics"].length-1)){
            node.querySelector(".carte-desciption").innerText = info["mechanics"][i];
        }
        if(info["mechanics"][i]=="Taunt" ||info["mechanics"][i]=="Charge"){
            let power = document.createElement("div");
            power.className = "carte-"+info["mechanics"][i];
            node.appendChild(power);
            if(info["mechanics"][i]=="Taunt"){
                node.style.borderBottom = "0.5vh solid rgb(0, 174, 255)";
            }
        }
    }
    node.id = "d"+info.uid;

    return node;
}

const jouer = (action,uid, uidTarget) =>{
    let formData = new FormData();

    formData.append("action", action);
    formData.append("uid", uid);
    formData.append("uidTarget", uidTarget);

    fetch("jeuAjax.php", {
        method : "POST",
        credentials : "include",
        body : formData
    })
    .then (response => response.json())
    .then(data =>{
        //console.log(data);
    })
}

const clickCarte = (evt,carte) =>{
    console.log("cete carte");
    let carteValide = false;
    if(myTurn){
        let state = carte.querySelector(".carte-state").innerText;
        console.log(state);
        if(state!="SLEEP"){
            if(state == "undefined"){
                let manaCost = carte.querySelector(".carte-mana-valeur").innerText;
                console.log(manaCost, parseInt(playerMana.innerText));
                if(manaCost <= parseInt(playerMana.innerText)){
                    console.log("MAIN!!!!!! VALKIDE");
                    carteValide = true;
                }
            }
            else{
                carteValide = true;
            }
        }
        if(carteValide){
            uid = carte;
            shadowCard = carte.cloneNode(true);
            carte.style.opacity = 0;
            shadowCard.style.position = "absolute";
            shadowCard.style.pointerEvents = "none";
            shadowCard.style.zIndex = 100;
    
            document.querySelector(".table-jeu").appendChild(shadowCard);
            shadowCard.style.opacity = 0.8;
            mouseMove(evt);
        }
    }
}

const hover = (evt,node) =>{
    if(uid){
        uidTarget = node;
    }
}
const notHover = (evt) =>{
    uidTarget = null;
}

const mouseMove = evt =>{
    if(shadowCard != undefined){
        let width = shadowCard.clientWidth;
        let heigth = shadowCard.clientHeight;
        shadowCard.style.left = (evt.x - width/2) + "px";
        shadowCard.style.top = (evt.y - heigth/2) + "px";
    }
}
const mouseUp = evt =>{
    if(uid){
        let state = uid.querySelector(".carte-state").innerText;
        if(uidTarget!=null){
            if(uidTarget.id == "myBoard" && state == "undefined"){
                shadowCard.style.left = 0 + "px";
                shadowCard.style.top = 0 + "px";
                shadowCard.style.position = "relative";
                shadowCard.remove();
                shadowCard = null;
                let carte = document.querySelector("#"+uid.id);
                carte.style.opacity = 1;
                
                uidTarget.appendChild(carte);
                jouer("PLAY",uid.id.substr(1),null);
            }else if (uidTarget.id != "myBoard"){
                shadowCard.remove();
                shadowCard = null;
                
                let carte = document.querySelector("#"+uid.id);
                carte.style.opacity = 1;
                jouer("ATTACK",uid.id.substr(1),uidTarget.id.substr(1));
            }
            else{
                shadowCard.remove();
                shadowCard = null;
                document.querySelector("#"+uid.id).style.opacity = 1;
            }
        }
        else{
            console.log("rien");
            shadowCard.remove();
            shadowCard = null;
            document.querySelector("#"+uid.id).style.opacity = 1;
        }
        uid = null;
    }
}

let hideChat = false;
const bouton = btn =>{
    if(btn.name == "HERO_POWER" || btn.name == "END_TURN"){
        jouer(btn.name, null, null);
    }
    else if(btn.name == "SHOW_CHAT"){

        let node = document.querySelector(".chat-jeu");
        let x = parseInt(node.style.left);
        let y = parseInt(node.style.top);
        let xFinal = 0;
        if(hideChat){
            xFinal= -700;
        }
        node.style.left = xFinal +"px";
        let anim = new AnimationHelper(node,[[x,y,0,0],[xFinal, y, 0,0.5]]);
        spriteList.push(anim);

        hideChat = !hideChat;
    }
    else if(btn.name == "QUITTER"){
        window.location.href = "lobby.php";
    }
}



