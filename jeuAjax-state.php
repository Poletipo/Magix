<?php
    require_once("action/CommonAction.php");

    class JeuAjaxState extends CommonAction{
        
        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $data["key"] = $_SESSION["theOneAndUltimateKey"];

            $result = parent::callAPI("games/state", $data);
            return compact("result");
        }
    }

    $action = new JeuAjaxState();
    $data = $action->execute();

    echo json_encode($data["result"]);