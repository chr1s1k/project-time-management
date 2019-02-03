<?php

class User {

	// database connection and table name
	private $connection;
	private $tableName = "users";

	// object properties
	private $id;
	private $firstName;
	private $lastName;
	private $username;
	private $password;
	private $passwordHash;
	private $role;

	// constructor
	public function __construct($db){
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
	 * Get the value of firstName
	 */
	public function getFirstName()
	{
		return $this->firstName;
	}

	/**
	 * Set the value of firstName
	 *
	 * @return  self
	 */
	public function setFirstName($firstName)
	{
		$this->firstName = $firstName;

		return $this;
	}

	/**
	 * Get the value of username
	 */
	public function getUsername()
	{
		return $this->username;
	}

	/**
	 * Set the value of username
	 *
	 * @return  self
	 */
	public function setUsername($username)
	{
		$this->username = $username;

		return $this;
	}

	/**
	 * Get the value of password
	 */
	public function getPassword()
	{
		return $this->password;
	}

	/**
	 * Set the value of password
	 *
	 * @return  self
	 */
	public function setPassword($password)
	{
		$this->password = $password;

		return $this;
	}

	/**
	 * Get the value of role
	 */
	public function getRole()
	{
		return $this->role;
	}

	/**
	 * Set the value of role
	 *
	 * @return  self
	 */
	public function setRole($role)
	{
		$this->role = $role;

		return $this;
	}

	/**
	 * Get the value of lastName
	 */
	public function getLastName()
	{
		return $this->lastName;
	}

	/**
	 * Set the value of lastName
	 *
	 * @return  self
	 */
	public function setLastName($lastName)
	{
		$this->lastName = $lastName;

		return $this;
	}

	public function exists() {
		$query = "SELECT * FROM " . $this->tableName . " WHERE username = :username LIMIT 0,1";

		if (is_null($this->connection)) {
			return false;
		}

		$stmt = $this->connection->prepare($query);
		$stmt->bindParam(':username', $this->username);

		try {
			$stmt->execute();

			$row = $stmt->fetch(PDO::FETCH_ASSOC);

			// pokud se nic nenašlo, vrací se false, jinak pole
			// if (!$row) {
			// 	return false;
			// }

			$this->passwordHash = $row['password'];
			$this->id = $row['id'];
			$this->firstName = $row['firstName'];
			$this->lastName = $row['lastName'];
			$this->username = $row['username'];
			$this->role = $row['role'];

			return $row ? true : false;

		} catch (PDOException $e) {
			var_dump($e->getMessage());
		}
	}

	public function passwordIsOk($password) {
		if (is_null($password) || is_null($this->password)) {
			return false;
		}

		// ověř, zda poskystnuté heslo odpovídá hashi získaného z databáze
		return password_verify($password, $this->passwordHash);
	}

}