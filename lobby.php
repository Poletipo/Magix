<?php
    require_once("action/LobbyAction.php");

    $action = new LobbyAction();
    $data = $action->execute();

    require_once("partial/header.php");

?>
<script src="js/lobbyJavascript.js"></script>

<div class="lobby">
    <div class="lobby-banner">
        <?php
            if ($data["isLoggedIn"]) {
                ?>
                Bonjour, <?= $_SESSION["username"] ?> !
                <?php
            }
        ?>
    </div>
    
    <div class="lobby-btn-chat-container">
        <div class="lobby-btn-container">
            <button class="lobby-btn" name="pratique">Practice</button>
            <button class="lobby-btn" name="jouer">Play</button>
            <input class="lobby-input" type="text" name="PRIVATE_KEY" id="PRIVATE_KEY" placeholder="private key"/>
            <button class="lobby-btn" name="observer">Observe</button>
            <input class="lobby-input" type="text" name="observer" id="observe" placeholder="player name"/>
            <button class="lobby-btn" name="quitter">Quit</button>
        </div>

        <div class="lobby-chat-container">
            <iframe class="chat-lobby" style="width:500px;height:562px;" 
                src=<?="https://magix.apps-de-cours.com/server/#/chat/" . $_SESSION["theOneAndUltimateKey"]."/large"?>>
            </iframe>
        </div>
    </div>
</div>
<?php
    require_once("partial/footer.php");