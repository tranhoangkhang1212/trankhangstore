<?php

header("Access-Control-Allow-Methods: POST, OPTIONS");

require_once "../../config/access.php";
require_once "../../config/config.php";
require_once "../../helpers/CORS.php";
cors();

$data = json_decode(file_get_contents("php://input"));

$name = $data -> name;
$image = $data -> image;
$created = date('Y-m-d H:i:s');

$query = "INSERT INTO `brands` (`id`, `name`, `image`, `created`) 
VALUES (NULL, '$name', '$image', '$created')";
$result = mysqli_query($conn, $query);

if ($result) {
    http_response_code(200);
    echo json_encode(array(
        "status" => true,
        "message" => "Product created"
    ));
} else {
    http_response_code(404);
    echo json_encode(array(
        "status" => false,
        "message" => "Product not created"
    ));
}
