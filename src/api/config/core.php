<?php

// show error reporting
error_reporting(E_ALL);

// set your default time-zone
date_default_timezone_set("Europe/Prague");

// variables used for jwt
$key = "this_is_secret_key";
$iss = "https://radeksukup.com";
// $aud = "http://example.com";
$iat = time(); // time the JWT was issued
$exp = $iat + 60 * 20;
// $nbf = 1357000000;