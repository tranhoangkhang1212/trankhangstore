<?php

header("Access-Control-Allow-Methods: PATCH, OPTIONS");

require_once "../../config/access.php";
require_once "../../config/config.php";
require_once "../../helpers/CORS.php";
cors();

$data = json_decode(file_get_contents("php://input"));

for ($i = 0; $i < count($data); $i++) {
    $id = $data[$i]->id;
    $type = $data[$i]->type;
    $image = $data[$i]->image;

    $query = "UPDATE `layout` 
            SET image = '$image'
            WHERE layout.id = '$id' AND layout.type = '$type'";
    $result = mysqli_query($conn, $query);
}

if ($result) {
    http_response_code(200);
    echo json_encode(array(
        "status" => true,
        "message" => "Layout updated"
    ));
} else {
    http_response_code(404);
    echo json_encode(array(
        "status" => false,
        "message" => "Layout not updated"
    ));
}
