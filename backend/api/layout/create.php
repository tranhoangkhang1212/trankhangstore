<?php

header("Access-Control-Allow-Methods: POST, OPTIONS");

require_once "../../config/access.php";
require_once "../../config/config.php";
require_once "../../helpers/CORS.php";
cors();

$data = json_decode(file_get_contents("php://input"));

$created = date('Y-m-d H:i:s');

for ($i = 0; $i < count($data); $i++) {
    
    $id = $data[$i]->id;
    $type = $data[$i]->type;
    $image = $data[$i]->image;

    $query_delete = "DELETE FROM `layout` 
            WHERE layout.type = '$type'";
    $result = mysqli_query($conn, $query_delete);
}

for ($i = 0; $i < count($data); $i++) {
    
    $id = $data[$i]->id;
    $type = $data[$i]->type;
    $image = $data[$i]->image;

    $query_create = "INSERT INTO `layout` (`id`, `image`, `type`, `hide`, `created`) 
    VALUES (NULL, '$image', '$type', 'false', '$created')";
    $result_create = mysqli_query($conn, $query_create);
}

if ($result) {
    http_response_code(200);
    echo json_encode(array(
        "status" => true,
        "message" => "Layout created"
    ));
} else {
    http_response_code(404);
    echo json_encode(array(
        "status" => false,
        "message" => "Layout not created"
    ));
}
