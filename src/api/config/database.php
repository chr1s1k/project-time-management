<?php

error_reporting(E_ALL ^ E_NOTICE);

class Database {

	private $host = "localhost";
	private $dbName = "project_time_management";
	private $username = "root";
	private $password = "toor";
	private $connection;

	public function getConnection() {
		$this->connection = null;

		try {
			$this->connection = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->dbName, $this->username, $this->password, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
			$this->connection->exec("set names utf8");
		} catch (PDOException $e) {
			print "Connection error!: " . $e->getMessage();
			die();
		}

		return $this->connection;
	}

}