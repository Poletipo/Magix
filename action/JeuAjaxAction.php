<?php
    require_once("action/CommonAction.php");

    class JeuAjaxAction extends CommonAction{
        
        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $data["key"] = $_SESSION["theOneAndUltimateKey"];
            $result = [];
            if(isset($_POST["name"])){

                $result = parent::callAPI("signout", $data);
            }

            return compact("result");
        }
    }