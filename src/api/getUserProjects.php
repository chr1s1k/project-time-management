<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:8080");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "./config/database.php";
include_once "./objects/User.php";

include_once "./config/core.php";
include_once "./libs/php-jwt-master/src/BeforeValidException.php";
include_once "./libs/php-jwt-master/src/ExpiredException.php";
include_once "./libs/php-jwt-master/src/SignatureInvalidException.php";
include_once "./libs/php-jwt-master/src/JWT.php";
use \Firebase\JWT\JWT;

// získej JWT z cookie
$jwt = isset($_COOKIE['jwt']) ? $_COOKIE['jwt'] : null;

if (!is_null($jwt)) {
	try {
		$decoded = JWT::decode($jwt, $key, array('HS256'));
		http_response_code(200);

		$userId = isset($_GET['userId']) && is_numeric($_GET['userId']) ? $_GET['userId'] : null;

		if (!is_null($userId)) {

			$database = new Database();
			$db = $database->getConnection();

			$user = new User($db);
			$user->setId($userId);
			$projects = $user->getAssignedProjects();

			echo json_encode(array(
				"projects" => $projects
			));

		} else { // userID chybí v requestu
			http_response_code(400);
			echo json_encode(array(
				"message" => "Projekty se nepodařilo načíst, chybí userId."
			));
		}

	} catch (Exception $e) {
		http_response_code(401);

		echo json_encode(array(
			"message" => "Vaše přihlášení vypršelo. Přihlašte se prosím znovu.",
			"error" => $e->getMessage()
		));
	}

	// JWT chybí v requestu
} else {
	http_response_code(401);

	echo json_encode(array(
		"message" => "Přístup zamítnut. Je potřeba být přihlášen."
	));
}