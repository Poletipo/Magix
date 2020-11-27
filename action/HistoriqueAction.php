<?php
    require_once("action/CommonAction.php");
    require_once("action/DAO/HistoriqueDAO.php");

    class HistoriqueAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $matches = HistoriqueDAO::getMatches();
            return compact("matches");
        }
    }