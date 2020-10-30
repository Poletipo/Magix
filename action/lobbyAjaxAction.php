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

                if($input == "quitter"){
                    $result = parent::callAPI("signout", $data);
                    session_unset();
                    session_destroy();

                }
                elseif ($input == "pratique" || $input == "jouer") {
                    $data["type"] = ($input == "pratique" ? "TRAINING" : "PVP");
                    $result = parent::callAPI("games/auto-match", $data);
                }
            }

            return compact("result");
        }
    }