<?php
    require_once("action/CommonAction.php");

    class LobbyAjaxAction extends CommonAction{
        
        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $data["key"] = $_SESSION["theOneAndUltimateKey"];
            $result = [];
            if(isset($_POST["name"])){
                $input = $_POST["name"];
                if(!empty($_POST["privateKey"])){
                    $data["privateKey"] = $_POST["privateKey"];
                }

                if($input == "QUITTER"){
                    $result = parent::callAPI("signout", $data);
                    session_unset();
                    session_destroy();

                }
                elseif ($input == "pratique" || $input == "jouer") {
                    $data["type"] = ($input == "pratique" ? "TRAINING" : "PVP");
                    $result = parent::callAPI("games/auto-match", $data);
                }
                elseif ($input == "pratiqueCoop" || $input == "jouerCoop"){
                    $data["type"] = ($input == "pratiqueCoop" ? "TRAINING" : "PVP");
                    $data["mode"] = "COOP";
                    $result = parent::callAPI("games/auto-match", $data);
                }
                elseif($input == "observer"){
                    if(!empty($_POST["username"])){
                        $_SESSION["obsUsername"] = $_POST["username"];
                        $data["type"] = $_POST["username"];
                        $result = parent::callAPI("games/observe", $data);
                    }
                }
            }

            return compact("result");
        }
    }