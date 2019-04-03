<?php

class Timesheet {

	// database connection and table name
	private $connection;
	private $tableName = "timesheets";

	private $id;
	private $projectId;
	private $userId;
	private $hours;
	private $date;
	private $note;
	private $created;

	// constructor
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
	 * Get the value of projectId
	 */ 
	public function getProjectId()
	{
		return $this->projectId;
	}

	/**
	 * Set the value of projectId
	 *
	 * @return  self
	 */
	public function setProjectId($projectId)
	{
		$this->projectId = $projectId;

		return $this;
	}

	/**
	 * Get the value of userId
	 */
	public function getUserId()
	{
		return $this->userId;
	}

	/**
	 * Set the value of userId
	 *
	 * @return  self
	 */
	public function setUserId($userId)
	{
		$this->userId = $userId;

		return $this;
	}

	/**
	 * Get the value of hours
	 */
	public function getHours()
	{
		return $this->hours;
	}

	/**
	 * Set the value of hours
	 *
	 * @return  self
	 */
	public function setHours($hours)
	{
		$this->hours = $hours;

		return $this;
	}

	/**
	 * Get the value of date
	 */ 
	public function getDate()
	{
		return $this->date;
	}

	/**
	 * Set the value of date
	 *
	 * @return  self
	 */
	public function setDate($date)
	{
		$this->date = $date;

		return $this;
	}

	/**
	 * Get the value of note
	 */
	public function getNote()
	{
		return $this->note;
	}

	/**
	 * Set the value of note
	 *
	 * @return  self
	 */
	public function setNote($note)
	{
		$this->note = $note;

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

	public function create($projectId, $userId, $hours, $date, $note = null) {
		if (is_null($this->connection)) {
			return false;
		}

		$query = "INSERT INTO " . $this->tableName . "(id, project_id, user_id, hours, date, note, created) VALUES (NULL, :projectId, :userId, :hours, :date, :note, :created);";

		$stmt = $this->connection->prepare($query);

		if (!is_null($note)) {
			$note = htmlspecialchars(strip_tags($note));
		}

		$created = time();

		$stmt->bindParam(':projectId', $projectId);
		$stmt->bindParam(':userId', $userId);
		$stmt->bindParam(':hours', $hours);
		$stmt->bindParam(':date', $date);
		$stmt->bindParam(':note', $note);
		$stmt->bindParam(':created', $created);

		try {
			return $stmt->execute();
		} catch (PDOException $e) {
			return false;
		}
	}

	public function delete($timesheetId, $userId) {
		if (is_null($this->connection)) {
			return false;
		}

		$query = "DELETE FROM " . $this->tableName . " WHERE id = :timesheetId AND user_id = :userId";

		$stmt = $this->connection->prepare($query);
		$stmt->bindParam(':timesheetId', $timesheetId);
		$stmt->bindParam(':userId', $userId);

		try {
			$stmt->execute();
			$count = $stmt->rowCount(); // vrátí počet řádků
			return (bool) $count;
		} catch (PDOException $e) {
			return false;
		}
	}

}