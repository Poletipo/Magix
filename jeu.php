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
    <div class="enemy-play-side">
        <div class="carte"></div>
        <div class="carte"></div>
    </div>
    <div class="player-play-side">

        <div class="carte">
            <div class="carte-mana">
                <p class="carte-mana-valeur">5</p>
            </div>
            <div class="carte-attack">
                <p class="carte-attack-valeur">5</p>
            </div>
            <div class="carte-vie">
                <p class="carte-vie-valeur">5</p>
            </div>
            <div class="carte-noOverflow">
                <div class="carte-text-section">
                    <h1 class = "carte-nom">Nom du perso</h1>
                    <p class = "carte-desciption">Ce monstre tue le mechant de toute race. Il est absolument sans pitié.</p>
                </div>
            </div>
            <div class="carte-shield"></div>
        </div>

        <div class="carte">
            <div class="carte-mana">
                <p class="carte-mana-valeur">5</p>
            </div>
            <div class="carte-attack">
                <p class="carte-attack-valeur">5</p>
            </div>
            <div class="carte-vie">
                <p class="carte-vie-valeur">5</p>
            </div>
            <div class="carte-noOverflow">
                <div class="carte-text-section">
                    <h1 class = "carte-nom">Nom du perso</h1>
                    <p class = "carte-desciption">Ce monstre tue le mechant de toute race. Il est absolument sans pitié.</p>
                </div>
            </div>
            <div class="carte-shield"></div>
        </div>

        <div class="carte">
            <div class="carte-mana">
                <p class="carte-mana-valeur">5</p>
            </div>
            <div class="carte-attack">
                <p class="carte-attack-valeur">5</p>
            </div>
            <div class="carte-vie">
                <p class="carte-vie-valeur">5</p>
            </div>
            <div class="carte-noOverflow">
                <div class="carte-text-section">
                    <h1 class = "carte-nom">Nom du perso</h1>
                    <p class = "carte-desciption">Ce monstre tue le mechant de toute race. Il est absolument sans pitié.</p>
                </div>
            </div>
            <div class="carte-shield"></div>
        </div>
        
    </div>
    <div class="player-side">
        <div class = "player-side-info">
            <div class="player-side-info-valeur">
                <div class ="player-vie">
                    <p class="player-vie-valeur">100</p>
                </div>
                <div class ="player-mana">
                    <p class="player-mana-valeur">100</p>
                </div>
            </div>
            <div class="player-side-info-carte">
                <div class ="player-cartesLogo">
                    <p class="player-cartesRestanteValeur">50</p>
                </div>
            </div>
        </div>
        <div class = "player-side-cartesEnMain">
            <div class="carte"></div>
            <div class="carte"></div>
            <div class="carte"></div>
 
        </div>
        <div class = "player-side-buttons-container">
            <button class="player-side-buttons" name = "HEROPOWER">HEROPOWER</button>
            <button class="player-side-buttons" name = "ENDTURN">END TURN</button>
            <button class="player-side-buttons" name = "SHOWCHAT">SHOW CHAT</button>
        </div>
    </div>



</div>


<?php
    require_once("partial/footer.php");