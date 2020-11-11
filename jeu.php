<?php
    require_once("action/jeuAction.php");

    $action = new jeuAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
<script src="js/AnimationHelper.js"></script>
<script src="js/jeuJavascript.js"></script>

<template class="carte" >
    <div class="carte-state"></div>
    <div class="carte-mana">
        <p class="carte-mana-valeur"></p>
    </div>
    <div class="carte-attack">
        <p class="carte-attack-valeur"></p>
    </div>
    <div class="carte-vie">
        <p class="carte-vie-valeur"></p>
    </div>
    <div class="carte-noOverflow">
        <div class="carte-text-section">
            <h1 class = "carte-nom"></h1>
            <p class = "carte-desciption"></p>
        </div>
    </div>
</template>



<div class="table-jeu">

    <p class="Phrase" id ="enemyPhrase">Hello, how are you?</p>
    <p class="Phrase" id ="playerPhrase">Fine, thank you!</p>

    <div class="game-state">
        <p class="game-state-text">Partie Perdu</p>
        <button class="btn-quitter" name ="QUITTER">Quit</button>
    </div>

    <div class="enemy-side">
        <div class = "enemy-side-cartesEnMain">

    

        </div>
        <div class = "enemy-side-milieu">
            <div class="enemy-space"></div>
            <div class = "enemy-vie">
                <p class="enemy-vie-valeur"></p>
            </div>
            <div class = "enemy-picture" id ="d0">
                <p class= "enemy-class"></p>
                <p class= "enemy-name"></p>
            </div>
            <div class = "enemy-mana">
                <p class="enemy-mana-valeur"></p>
            </div>
            <div class="enemy-space"></div>
        </div>
        <div class = "enemy-side-cartesRestantes">
            <div class ="enemy-cartesLogo"></div>
            <p class="enemy-cartesRestanteValeur"></p>
        </div>
    </div>
    <div class="enemy-play-side">
        

        
    </div>
    <div class="player-play-side" id="myBoard">

        
    
    </div>
    <div class="player-side">
        <div class = "player-side-info">
            <div class="player-side-info-valeur">
                <div class ="player-vie">
                    <p class="player-vie-valeur"></p>
                </div>
                <div class ="player-mana">
                    <p class="player-mana-valeur"></p>
                </div>
            </div>
            <div class="player-side-info-carte">
                <div class ="player-cartesLogo">
                    <p class="player-cartesRestanteValeur"></p>
                </div>
            </div>
        </div>
        <div class = "player-side-cartesEnMain">
        


        </div>
        <div class = "player-side-buttons-container">
            <button class = "player-side-buttons" id="btn-HeroPower" name = "HERO_POWER"></button>
            <button class = "player-side-buttons" id="btn-EndTurn" name = "END_TURN"></button>
            <button class = "player-side-buttons" id="btn-ShowChat" name = "SHOW_CHAT"></button>
        </div>
    </div>

    <div class = "section-time">
        <p class="time-valeur">50</p>
        <div class="time-sablier"></div>
    </div>

    <iframe class = "chat-jeu" style="width:500px;height:562px;" 
        src=<?="https://magix.apps-de-cours.com/server/#/chat/" . $_SESSION["theOneAndUltimateKey"]."/large"?>>
    </iframe>


</div>



<?php
    require_once("partial/footer.php");