<?php
    require_once("action/CommonAction.php");

    class LobbyAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            
            unset($_SESSION["obsUsername"]);
            $_SESSION["gameDone"] = "notDone";

            return [];
        }
    }