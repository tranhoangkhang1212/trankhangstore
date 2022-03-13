<?php

header("Access-Control-Allow-Methods: PATCH, OPTIONS");

require_once "../../config/access.php";
require_once "../../config/config.php";
require_once "../../helpers/CORS.php";
cors();

$data = json_decode(file_get_contents("php://input"));

$id = $data -> id;

$arr = array(
    "name" => $data -> name,
    "image" => $data -> image,
);

    foreach ($arr as $key => $value) {
        if ($value !== '') {
            $query = "UPDATE `brands` SET `$key` = '$value' WHERE brands.id = '$id'";
            $result = mysqli_query($conn, $query);
        } else {
            http_response_code(403);
        }
    }
    if ($result) {
        http_response_code(200);
        echo json_encode(array(
            "status" => true,
            "message" => "Brands updated"
        ));
    } else {
        http_response_code(404);
        echo json_encode(array(
            "status" => false,
            "message" => "Brands not updated"
        ));
    }
