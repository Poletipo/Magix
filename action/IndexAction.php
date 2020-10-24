<?php
    require_once("action/CommonAction.php");

    class IndexAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $hasConnectionError = false;
            
            if(isset($_POST["username"])){
                $data = [];
                $data["username"] = $_POST["username"];
                $data["password"] = $_POST["pwd"];

                $result = parent::callAPI("signin",$data);

                if ($result == "INVALID_USERNAME_PASSWORD") {
                    // err
                    $hasConnectionError = true;
                }
                else {
                    // Pour voir les informations retournées : var_dump($result);exit;
                    $_SESSION["theOneAndUltimateKey"] = $result->key;
                    $_SESSION["visibility"] = CommonAction::$VISIBILITY_MEMBER;
                    $_SESSION["username"] = $data["username"];
                    //$key = $result->key;

                    header("location:lobby.php");
					exit;
                }
            }
            
            return compact("hasConnectionError");
        }
    }