<?php
    require_once("action/DAO/Connection.php");

    class HistoriqueDAO{

        public static function getMatches(){
            $connection = Connection::getConnection();
            
            $statement = $connection->prepare("SELECT player,enemy, TO_CHAR(date,'dd/mm/yy') AS date,winner FROM magix_historique ORDER BY id DESC LIMIT 10");
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();
            
            return $statement->fetchAll();
        }
        
        public static function addMatch($player, $enemy, $winner){
            $connection = Connection::getConnection();
            $statement = $connection->prepare("INSERT INTO magix_historique VALUES (DEFAULT, ?, ?, CURRENT_DATE, ?);");
            $statement->bindParam(1, $player);
            $statement->bindParam(2, $enemy);
            $statement->bindParam(3, $winner);

            $statement->execute();
        }
    }
?>