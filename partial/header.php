<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="css/global.css" rel="stylesheet"/>
</head>
<body>
    <div>
        <?php
            if ($data["isLoggedIn"]) {
                ?>
                Bonjour, <?= $_SESSION["username"] ?> !
                [<a href="?logout=true">Déconnexion</a>]
                <?php
            }
        ?>
    </div>