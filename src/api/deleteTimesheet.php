<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:8080");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: OPTIONS, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// odpověď na preflight request
// https://github.com/Luracast/Restler/issues/254
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	header('Access-Control-Allow-Origin: http://localhost:8080');
	header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
	header('Access-Control-Allow-Headers: *');
	exit;
}

include_once "./config/database.php";
include_once "./objects/Timesheet.php";
include_once "./objects/Project.php";

include_once "./config/core.php";
include_once "./libs/php-jwt-master/src/BeforeValidException.php";
include_once "./libs/php-jwt-master/src/ExpiredException.php";
include_once "./libs/php-jwt-master/src/SignatureInvalidException.php";
include_once "./libs/php-jwt-master/src/JWT.php";
use \Firebase\JWT\JWT;

$jwt = isset($_COOKIE['token']) ? $_COOKIE['token'] : null;

if (!is_null($jwt)) {
	try {
		$decoded = JWT::decode($jwt, $key, array('HS256'));

		if (isset($_GET['id']) && is_numeric($_GET['id'])) {
			$id = (int) $_GET['id'];
			$projectId = (int) $_GET['projectId'];
			$userId = $decoded->data->id;

			$database = new Database();
			$db = $database->getConnection();

			$timesheet = new Timesheet($db);
			$timesheetDeleted = $timesheet->delete($id, $userId);

			if ($timesheetDeleted) {
				$project = new Project($db);
				$projectDetail = $project->getDetail($projectId, $userId);

				http_response_code(200);
				$message = "Výkaz práce byl úspěšně smazán.";
			} else {
				http_response_code(409);
				$message = "Výkaz práce se nepodařilo smazat, zkuste to prosím znovu.";
			}

			echo json_encode(array(
				"message" => $message,
				"project" => $timesheetDeleted ? $projectDetail : null,
			));

		} else {
			http_response_code(400);
			echo json_encode(array(
				"message" => "Chybí ID timesheetu."
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