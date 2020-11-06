<?php
    require_once("action/CommonAction.php");

    class JeuAjaxAction extends CommonAction{
        
        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $data["key"] = $_SESSION["theOneAndUltimateKey"];
            $result = [];
            if(isset($_POST["action"])){
                $data["type"] = $_POST["action"];
                $data["uid"] = $_POST["uid"];
                $data["targetuid"] = $_POST["uidTarget"];

                $result = parent::callAPI("games/action", $data);
            }

            return compact("result");
        }
    }