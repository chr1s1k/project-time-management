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

	public function getDetail($id) {
		if (is_null($this->connection) || !is_numeric($id)) {
			return false;
		}

		$query = "SELECT
		p.id,
		p.title,
		p.created,
		p.finished,
		CONCAT(u1.firstName, ' ', u1.lastName) as finishedBy,
		CONCAT(u.firstName, ' ', u.lastName) as createdBy,
		t.id AS timesheetId,
		CONCAT(u2.firstName, ' ', u2.lastName) as worker,
		t.hours,
		t.date,
		t.note
		FROM " . $this->tableName . " p
		LEFT JOIN users u ON p.createdBy = u.id
		LEFT JOIN users u1 ON p.finishedBy = u1.id
		LEFT JOIN timesheets t ON p.id = t.project_id
		LEFT JOIN users u2 ON t.user_id = u2.id
		WHERE p.id = :projectId
		ORDER BY t.date ASC";

		$stmt = $this->connection->prepare($query);
		$stmt->bindParam(':projectId', $id);

		try {
			$stmt->execute();

			$totalHours = 0;
			$timesheet = array();
			$timesheets = array();
			$i = 0;

			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
				// meta informace o projektu
				if ($i === 0) {
					$projectDetail = array(
						'id' => (int) $row['id'],
						'title' => $row['title'],
						'created' => date('j.n.Y', $row['created']),
						'finished' => (bool) (int) $row['finished'],
						'finishedBy' => $row['finishedBy'],
						'createdBy' => $row['createdBy'],
					);
				}
				// timesheety, pouze pokud nějaké existují (je vykázáno na projektu)
				if (!is_null($row['timesheetId'])) {
					$timesheet = array(
						'id' => (int) $row['timesheetId'],
						'worker' => $row['worker'],
						'hours' => (float) $row['hours'],
						'date' => date('j.n.Y', strtotime($row['date'])),
						'note' => $row['note'],
					);
					array_push($timesheets, $timesheet);
					$totalHours += (float) $row['hours']; // udělej součet všech vykázaných hodin na projektu
				}
				$i++;
			}

			$projectDetail['timesheets'] = $timesheets; // přidej timesheetové pole do detailu o projektu
			$projectDetail['totalHours'] = $totalHours; // přidej celkový počet vykázaných hodin

			return $projectDetail;
		} catch (PDOException $e) {
			return array();
		}
	}

}