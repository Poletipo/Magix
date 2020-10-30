<?php
    require_once("action/LobbyAction.php");

    $action = new LobbyAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
<script src="js/lobbyJavascript.js"></script>
<div>
        <h1>Ceci est le Lobby</h1>
        <button name="pratique">Pratique</button>
        <button name="jouer">Jouer</button>
        <button name="quitter">Quitter</button>
</div>

<div>
    <iframe style="width:700px;height:240px;" 
        src=<?="https://magix.apps-de-cours.com/server/#/chat/" . $_SESSION["theOneAndUltimateKey"]?>>
    </iframe>
</div>

<?php
    require_once("partial/footer.php");