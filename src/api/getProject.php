<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:8080");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

include_once "./config/database.php";
include_once "./objects/Project.php";

include_once "./config/core.php";
include_once "./libs/php-jwt-master/src/BeforeValidException.php";
include_once "./libs/php-jwt-master/src/ExpiredException.php";
include_once "./libs/php-jwt-master/src/SignatureInvalidException.php";
include_once "./libs/php-jwt-master/src/JWT.php";
use \Firebase\JWT\JWT;

// získej JWT z cookie
$jwt = isset($_COOKIE['token']) ? $_COOKIE['token'] : null;

if (!is_null($jwt)) {
	try {
		$decoded = JWT::decode($jwt, $key, array('HS256'));
		http_response_code(200);

		$projectId = isset($_GET['id']) && is_numeric($_GET['id']) ? $_GET['id'] : null;

		if (!is_null($projectId)) {

			$database = new Database();
			$db = $database->getConnection();

			$project = new Project($db);
			$projectDetail = $project->getDetail($projectId);

			echo json_encode(array(
				"project" => $projectDetail
			));

		} else { // userID chybí v requestu
			http_response_code(400);
			echo json_encode(array(
				"message" => "Projekt se nepodařilo načíst, chybí project ID."
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