<?php
    require_once("action/CommonAction.php");

    class JeuAjaxState extends CommonAction{
        
        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $data["key"] = $_SESSION["theOneAndUltimateKey"];

            if(isset($_SESSION["obsUsername"])){
                $data["username"] = $_SESSION["obsUsername"];
                $result = parent::callAPI("games/observe", $data);
            }
            else{
                $result = parent::callAPI("games/state", $data);
            }
            return compact("result");
        }
    }

    $action = new JeuAjaxState();
    $data = $action->execute();

    echo json_encode($data["result"]);