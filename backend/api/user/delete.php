<?php

header("Access-Control-Allow-Methods: DELETE");

require_once "../../config/access.php";
require_once "../../config/config.php";
require_once "../../helpers/CORS.php";
cors();

if (isset($_GET['id']) && $_GET['id'] != "") {
    $id = $_GET['id'];

    $query = "DELETE FROM `users` WHERE id = '$id'";
    $result = mysqli_query($conn, $query) or die("Select Query Failed");

    if ($result) {
        echo json_encode(array(
            "status" => true,
            "message" => "Success"
        ));
    } else {
        http_response_code(404);
        echo json_encode(array(
            "status" => false,
            "message" => "Failed"
        ));
    }
    
}
