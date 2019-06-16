<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:8080");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: OPTIONS, PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

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

		$data = json_decode(file_get_contents("php://input"));
		if (isset($data->projectId) && is_numeric($data->projectId) && isset($data->userId) && is_numeric($data->userId) && isset($data->hours) && is_numeric($data->hours) && isset($data->id) && is_numeric($data->id)) {

			// zkontroluj, zda se snažíme editovat pouze svůj timesheet
			if ($decoded->data->id === $data->userId) {
				$database = new Database();
				$db = $database->getConnection();
				$projectDetail = null;

				$timesheet = new Timesheet($db);
				$timesheetEdited = $timesheet->edit($data->id, $data->userId, $data->hours, $data->note);

				// když úspěšně zeditujeme timesheet, tak rovnou vrátíme všechny existující timesheety pro tento projekt a pro daného uživatele
				if ($timesheetEdited) {
					$project = new Project($db);
					$projectDetail = $project->getDetail($data->projectId, $data->userId);

					http_response_code(200);
					$message = "Výkaz práce byl úspěšně upraven.";
				} else {
					http_response_code(409);
					$message = "Výkaz práce se nepodařilo upravit, zkuste to prosím znovu.";
				}

				echo json_encode(array(
					"message" => $message,
					"project" => $projectDetail,
				));

			} else {
				http_response_code(400);
				echo json_encode(array(
					"message" => "Tato editace není povolena."
				));
			}

		} else {
			http_response_code(400);
			echo json_encode(array(
				"message" => "Nevalidní vstupní data."
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