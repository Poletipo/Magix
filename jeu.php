<?php
    require_once("action/jeuAction.php");

    $action = new jeuAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
<div class="table-jeu">
    <div class="enemy-side">
        <div class = "enemy-side-cartesEnMain">
            <div class="enemy-unturned-card"></div>
            <div class="enemy-unturned-card"></div>
        </div>
        <div class = "enemy-side-milieu">
            <div class="enemy-space"></div>
            <div class = "enemy-vie">
                <p class="enemy-vie-valeur">100</p>
            </div>
            <div class = "enemy-picture">
                <p class= "enemy-name">Enemy</p>
            </div>
            <div class = "enemy-mana">
                <p class="enemy-mana-valeur">100</p>
            </div>
            <div class="enemy-space"></div>
        </div>
        <div class = "enemy-side-cartesRestantes">
            <div class ="enemy-cartesLogo"></div>
            <p class="enemy-cartesRestanteValeur">50</p>
        </div>
    </div>
    <div class="enemy-play-side"></div>
    <div class="player-play-side"></div>
    <div class="player-side">
        <div class = "player-side-info"></div>
        <div class = "player-side-cartesEnMain">
        </div>
        <div class = "player-side-buttonsRight"></div>
    </div>



</div>


<?php
    require_once("partial/footer.php");