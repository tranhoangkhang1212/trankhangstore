<?php

header("Access-Control-Allow-Methods: PATCH, OPTIONS");

require_once "../../config/access.php";
require_once "../../config/config.php";
require_once "../../helpers/CORS.php";
cors();

$query_all = "UPDATE `products` SET `sale` = ''";
mysqli_query($conn, $query_all);

$data = json_decode(file_get_contents("php://input"));

foreach ($data as $key => $value) {
    $id = $value -> id;
    $query = "UPDATE `products` SET `sale` = 'true' WHERE products.id = '$id'";
    $result = mysqli_query($conn, $query);
}

if ($result) {
    http_response_code(200);
    echo json_encode(array(
        "status" => true,
        "message" => "Product sale updated"
    ));
} else {
    http_response_code(404);
    echo json_encode(array(
        "status" => false,
        "message" => "Product sale updated"
    ));
}
