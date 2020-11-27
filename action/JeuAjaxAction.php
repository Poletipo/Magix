<?php
    require_once("action/CommonAction.php");
    require_once("action/DAO/HistoriqueDAO.php");

    class JeuAjaxAction extends CommonAction{
        
        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $data["key"] = $_SESSION["theOneAndUltimateKey"];
            $result = [];
            if(isset($_POST["action"])){

                if($_POST["action"] == "historique" && $_SESSION["gameDone"] != "done"){
                    if($_POST["winner"] == "player"){
                        $winner = $_SESSION["username"];
                    }
                    else{
                        $winner = $_POST["enemy"];
                    }
                    HistoriqueDAO::addMatch($_SESSION["username"],$_POST["enemy"],$winner);
                    $_SESSION["gameDone"] = "done";
                    $result = "done";
                }
                else if($_POST["action"] != "historique"){
                    $data["type"] = $_POST["action"];
                    $data["uid"] = $_POST["uid"];
                    $data["targetuid"] = $_POST["uidTarget"];
                    $result = parent::callAPI("games/action", $data);

                }

            }

            return compact("result");
        }
    }