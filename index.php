<?php
    require_once("action/IndexAction.php");

    $action = new IndexAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>

<script type="module" src="./js/indexJavascript.js"></script>

<div class="login">
    <div class="login-title"></div>
    <div class="geralt"></div>
    <div class="ciri"></div>
    <div class="login-form-frame">
        <h1 class="login-connexion">Connexion</h1>
        <form action="index.php" method="post" class="login-form">
            <div class="form-demands">
                <div class="form-label">
                    <label for="username">Username : </label>
                </div>
                <div class="form-input">
                    <input type="text" name="username" id="username" />
                </div>
                <div class="form-separator"></div>
            </div>
            <div class="form-demands">
                <div class="form-label">
                    <label for="password">Password : </label>
                </div>
                <div class="form-input">
                    <input type="password" name="pwd" id="password" />
                </div>
                <div class="form-separator"></div>
            </div>
            <div class="form-demands">
                <div class="form-button">
                    <button type="submit">Connexion</button>
                </div>
                <?php
                    if ($data["hasConnectionError"]) {
                        ?>
                        <div class="error-div"><strong>Erreur : </strong>Connexion erronée</div>
                        <?php
                    }
                ?>
                <div class="form-separator"></div>
            </div>
        </form>
    </div>
    <div class= "smoke-container"></div>
</div>

<?php
    require_once("partial/footer.php");
