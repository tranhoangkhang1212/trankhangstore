<?php

header("Access-Control-Allow-Methods: OPTIONS, PATCH");

require_once "../../../config/access.php";
require_once "../../../config/config.php";
require_once "../../../helpers/CORS.php";
cors();

if (isset($_GET['id']) && $_GET['id'] != "") {
    $order_id = $_GET['id'];

    $query = "UPDATE orders SET payment = 'true' WHERE id = $order_id";
    $result = mysqli_query($conn, $query) or die("Select Query Failed");

    if ($result) {
        echo json_encode(array(
            "status" => true,
            "message" => "Update type successful"
        ));
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "No Record Found"));
    }
}
