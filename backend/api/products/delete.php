<?php

header("Access-Control-Allow-Methods: DELETE");

require_once "../../config/access.php";
require_once "../../config/config.php";
require_once "../../helpers/CORS.php";
cors();

if (isset($_GET['id']) && $_GET['id'] != "") {
    $productID = $_GET['id'];

    $query = "DELETE FROM `product_detail` WHERE productID = '$productID'";
    $query2 = "DELETE FROM `products` WHERE id = '$productID'";
    $result = mysqli_query($conn, $query) or die("Select Query Failed");
    $result2 = mysqli_query($conn, $query2) or die("Select Query Failed");

    if ($result && $result2) {
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
