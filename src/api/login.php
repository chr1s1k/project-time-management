<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
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

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

if (!is_null($data)) {
	$user->setUsername($data->username);
	$user->setPassword($data->password);

	// uživatel existuje v databázi a správně vyplnil své heslo
	if ($user->exists() && $user->passwordIsOk($data->password)) {

		// token
		$token = array(
			"iss" => $iss,
			// "aud" => $aud,
			"iat" => $iat,
			// "nbf" => $nbf,
			"exp" => $exp,
			"data" => array(
				"id" => $user->getId(),
				"firstName" => $user->getFirstName(),
				"lastName" => $user->getLastName(),
				"username" => $user->getUsername(),
				"role" => $user->getRole(),
			)
		);

		http_response_code(200);

		// generování jwt
		$jwt = JWT::encode($token, $key);

		echo json_encode(array(
			"message" => "Přihlášení proběhlo úspěšně.",
			"jwt" => $jwt
			)
		);

	// uživatel nenalezen nebo špatné heslo
	} else {
		http_response_code(401); // unauthorized

		echo json_encode(array(
			"message" => "Zadali jste nesprávné přihlašovací údaje."
		));
	}

} else {
	http_response_code(400); // bad request

	echo json_encode(array(
		"message" => "Přihlášení se nepodařilo. Zkuste to prosím znova."
	));
}