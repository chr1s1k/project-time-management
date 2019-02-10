<?php

class Project {

	// database connection and table name
	private $connection;
	private $tableName = "projects";

	private $id;
	private $title;
	private $created;
	private $createdBy;
	private $finished;

	public function __construct($db) {
		$this->connection = $db;
	}


	/**
	 * Get the value of id
	 */ 
	public function getId()
	{
		return $this->id;
	}

	/**
	 * Set the value of id
	 *
	 * @return  self
	 */ 
	public function setId($id)
	{
		$this->id = $id;

		return $this;
	}

	/**
	 * Get the value of title
	 */ 
	public function getTitle()
	{
		return $this->title;
	}

	/**
	 * Set the value of title
	 *
	 * @return  self
	 */ 
	public function setTitle($title)
	{
		$this->title = $title;

		return $this;
	}

	/**
	 * Get the value of created
	 */ 
	public function getCreated()
	{
		return $this->created;
	}

	/**
	 * Set the value of created
	 *
	 * @return  self
	 */ 
	public function setCreated($created)
	{
		$this->created = $created;

		return $this;
	}

	/**
	 * Get the value of createdBy
	 */ 
	public function getCreatedBy()
	{
		return $this->createdBy;
	}

	/**
	 * Set the value of createdBy
	 *
	 * @return  self
	 */ 
	public function setCreatedBy($createdBy)
	{
		$this->createdBy = $createdBy;

		return $this;
	}

	/**
	 * Get the value of finished
	 */ 
	public function getFinished()
	{
		return $this->finished;
	}

	/**
	 * Set the value of finished
	 *
	 * @return  self
	 */ 
	public function setFinished($finished)
	{
		$this->finished = $finished;

		return $this;
	}

	public function create($title, $createdBy) {
		if (is_null($this->connection)) {
			return false;
		}

		$query = "INSERT INTO " . $this->tableName . "(id, title, created, createdBy, finished) VALUES (NULL, :title, :created, :createdBy, false)";

		$stmt = $this->connection->prepare($query);

		$title = htmlspecialchars(strip_tags($title));
		$created = time();

		$stmt->bindParam(':title', $title);
		$stmt->bindParam(':created', $created);
		$stmt->bindParam(':createdBy', $createdBy);

		try {
			$stmt->execute();
			$projectId = $this->connection->lastInsertId(); // projekt úspěšně založen

			// přiřaď uživateli aktuálně vytvořenej projekt
			$user = new User($this->connection);
			$user->setId($createdBy);
			$projectAssigned = $user->assignProject($projectId);

			if ($projectAssigned) {
				return array(
					"id" => (int) $projectId,
					"title" => $title,
					"finished" => false
				);
			} else {
				return false;
			}
		} catch (PDOException $e) {
			return false;
		}
	}

}