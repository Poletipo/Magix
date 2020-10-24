<?php
    require_once("action/LobbyAction.php");

    $action = new LobbyAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
<div>
    <h1>Ceci est le Lobby</h1>
    <button>Pratique</button>
    <button>Jouer</button>
    <button>Quitter</button>
</div>

<div>
    <iframe style="width:700px;height:240px;" 
        src=<?="https://magix.apps-de-cours.com/server/#/chat/" . $_SESSION["theOneAndUltimateKey"]?>>
    </iframe>
</div>

<?php
    require_once("partial/footer.php");