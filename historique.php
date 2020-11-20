<?php
    require_once("action/HistoriqueAction.php");

    $action = new HistoriqueAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
<div class = "historique-container">

</div>



<?php
    require_once("partial/footer.php");