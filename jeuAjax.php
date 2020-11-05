<?php
    require_once("action/JeuAjaxAction.php");

    $action = new JeuAjaxAction();
    $data = $action->execute();

    echo json_encode($data["result"]);

