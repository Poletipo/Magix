<?php
    require_once("action/jeuAction.php");

    $action = new jeuAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>

<?php
    require_once("partial/footer.php");