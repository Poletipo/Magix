<?php
    require_once("action/HistoriqueAction.php");

    $action = new HistoriqueAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
<script src="js/historique.js"></script>

<div class = "historique-container">
    <button class="btn-quitter-corner" name="QUITTER"></button>

    <div class ="historique-match-list">

    <?php
        foreach ($data["matches"] as $match){
    ?>
        <div class = "historique-match">
            <div class ="hist-leftSpace"></div>
            <div class="hist-names-container">
                <p class="hist-name1"><?=$match["player"] ?></p>
                <p class="hist-vs">vs</p>
                <p class="hist-name2"><?=$match["enemy"] ?></p>
            </div>
            <div class="hist-date">
                <p><?=$match["date"]?></p>
            </div>
            
            <div class="hist-name-winner">
                <p class="text-winner">Winner</p>
                <p class="hist-name-winner-name"><?=$match["winner"]?></p>
            </div>
        </div>
        <?php
		}
        ?>

    </div>
</div>



<?php
    require_once("partial/footer.php");