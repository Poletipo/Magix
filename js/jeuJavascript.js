
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
let enemyPhrase;
let playerPhrase;

let gameState;
let msgError;

let carteTemplate;

let playerBoard;
let shadowCard = null;

let myTurn = false;

let uid = null;
let uidTarget = null;

let entered = false;

let listeMain = [];
let listePlayerBoard = [];
let listeEnemyBoard = [];

window.addEventListener("load", () => {
    timer = document.querySelector(".time-valeur");
    timerSprite = document.querySelector(".time-sablier");
    enemyName = document.querySelector(".enemy-name");
    enemyClass = document.querySelector(".enemy-class");
    enemyMana = document.querySelector(".enemy-mana-valeur");
    enemyVie = document.querySelector(".enemy-vie-valeur");
    enemyRemainingCard = document.querySelector(".enemy-cartesRestanteValeur");
    enemyPhrase = document.querySelector("#enemyPhrase");

    playerPhrase = document.querySelector("#playerPhrase");
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
    msgError = document.querySelector(".msg-error");

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
    
    spriteList.push(new Flamme(4.2,5.5,5,0.05, document.querySelector(".table-jeu"),"%"));
    spriteList.push(new Flamme(5.1,5.7,5,0.05, document.querySelector(".table-jeu"),"%"));
    

    spriteList.push(new Flamme(16.7,4.1,7,0.05, document.querySelector(".table-jeu"),"%"));
    spriteList.push(new Flamme(15.8, 5.26,4,0.05, document.querySelector(".table-jeu"),"%"));
    spriteList.push(new Flamme(17.2, 5.9,3,0.05, document.querySelector(".table-jeu"),"%"));
    
    spriteList.push(new Flamme(81.5, 5.2,5,0.05, document.querySelector(".table-jeu"),"%"));
    spriteList.push(new Flamme(83, 5.4,4,0.05, document.querySelector(".table-jeu"),"%"));
    spriteList.push(new Flamme(82, 7,6,0.05, document.querySelector(".table-jeu"),"%"));
    
    spriteList.push(new Flamme(95.2, 50.9,5,0.05, document.querySelector(".table-jeu"),"%"));
    spriteList.push(new Flamme(96, 49,5,0.05, document.querySelector(".table-jeu"),"%"));
    spriteList.push(new Flamme(94.45, 48,5,0.05, document.querySelector(".table-jeu"),"%"));
    
    spriteList.push(new Flamme(92.2, 78.25,3,0.05, document.querySelector(".table-jeu"),"%"));
    spriteList.push(new Flamme(91.48, 79.2,5,0.05, document.querySelector(".table-jeu"),"%"));
    spriteList.push(new Flamme(92, 82,6,0.05, document.querySelector(".table-jeu"),"%"));
    
    spriteList.push(new Flamme(7.5, 81.2,5,0.05, document.querySelector(".table-jeu"),"%"));
    spriteList.push(new Flamme(7.6, 85.1,4,0.05, document.querySelector(".table-jeu"),"%"));
    spriteList.push(new Flamme(6.9, 82.7,4,0.05, document.querySelector(".table-jeu"),"%"));
    spriteList.push(new Flamme(8.15, 81.6,4,0.05, document.querySelector(".table-jeu"),"%"));

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
        

       

        let stateText = null;
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
                    matchToDatabase("player");
                    enemyVie.innerText = "0";
                    
                }else if(stateText == "Game Lost"){
                    matchToDatabase("enemy");
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

            if(!entered){
                enemyPhrase.innerText = data["opponent"]["welcomeText"];
                if(data["opponent"]["username"] == "Arthax")
                    enemyPhrase.innerText = "Je suis une poule mouillé!";
                playerPhrase.innerText = data["welcomeText"];
                if(data["welcomeText"] == "My life for Aiur!")
                        playerPhrase.innerText = "Je suis une poule mouillé!";
                playIntro();
                entered = true;
            }
            myTurn = data["yourTurn"];
            listeMain = data["hand"];
            listePlayerBoard = data["board"];
            listeEnemyBoard = data["opponent"]["board"];
            
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

                if(data["hand"][i]["cost"] <= parseInt(playerMana.innerText)){
                    node.style.boxShadow = "0 0 0.3vh 0.3vh #00ff0e";
                }

                node.addEventListener("mousedown", evt =>{clickCarte(evt,node);});
                playerHand.appendChild(node);
            }
        }
    
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
        if(typeof data !== "object"){
            let msg = ""
            if(data == "BOARD_IS_FULL")
                msg = "The board is full";
            else if (data == "MUST_ATTACK_TAUNT_FIRST")
                msg = "You must attack Taunt cards first";
            else if (data == "WRONG_TURN")
                msg = "It's not your turn yet";
            else if (data == "GAME_NOT_FOUND")
                msg = "Game not found";
            else 
                msg = data;
            showError(msg);
        }
    })
}
let carteEnMain = false;
const clickCarte = (evt,carte) =>{
    let carteValide = false;
    if(myTurn){
        let state = carte.querySelector(".carte-state").innerText;
        
        carteEnMain = false;
        listeMain.forEach(carteMain=>{
            if(carteMain["uid"] == carte.id.substr(1)){
                carteEnMain = true;
            }
        })
        if(carteEnMain){
            let manaCost = carte.querySelector(".carte-mana-valeur").innerText;
            if(manaCost <= parseInt(playerMana.innerText)){
                carteValide = true;
            }
        }
        else if(state!="SLEEP"){
            carteValide = true;
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
        let handCard = false;
        for(let i = 0;i<listeMain.length;i++){
            if(uid.id == "d"+listeMain[i]["uid"]){
                handCard = true;
            }
        }
        if(!handCard){
            for(let i = 0;i<listeEnemyBoard.length;i++){
                if("d"+listeEnemyBoard[i]["uid"] == node.id){
                    node.style.boxShadow = "0 0 0.3vh 0.4vh #ffff00";
                }
            }
            if (node.id == "d0"){
                node.style.backgroundImage = "url('./img/picture-enemy-hover.png')"
            }
        }
    }
}
const notHover = (evt) =>{
    if(uidTarget != null){
        if(uidTarget.id != "myBoard" && uidTarget.id != "d0"){
            let state = uidTarget.querySelector(".carte-state").innerText;
            if (state == "IDLE"){
                uidTarget.style.boxShadow = "0 0 0.5vh 0.1vh orange";
            }
        }
        else if (uidTarget.id == "d0"){
            uidTarget.style.backgroundImage = "url('./img/picture-enemy.png')"
        }
    }

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
            if(uidTarget.id == "myBoard" && carteEnMain){
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

const playIntro = () =>{
    if(!entered){
        enemyPhrase.style.display = "block";
        playerPhrase.style.display = "block";
        setTimeout(playIntro, 3000);
    }
    else{
        enemyPhrase.style.display = "none";
        playerPhrase.style.display = "none";
    }
}

const showError = msg =>{
    msgError.innerText = msg;
    msgError.style.display = "block";
    setTimeout(hideError,3000);
}

const hideError = () =>{
    msgError.style.display = "none";
}

const matchToDatabase = winner =>{
    let formData = new FormData();

    formData.append("action", "historique");
    formData.append("enemy", enemyName.innerText);
    formData.append("winner", winner);

    fetch("jeuAjax.php", {
        method : "POST",
        credentials : "include",
        body : formData
    })
}
