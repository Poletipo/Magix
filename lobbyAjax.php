<?php
    require_once("action/LobbyAjaxAction.php");

    $action = new LobbyAjaxAction();
    $data = $action->execute();

    echo json_encode($data["result"]);

