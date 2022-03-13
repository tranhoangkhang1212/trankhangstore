<?php

header("Access-Control-Allow-Methods: POST, OPTIONS");

require_once "../../config/access.php";
require_once "../../config/config.php";
require_once "../../helpers/CORS.php";
cors();

$data = json_decode(file_get_contents("php://input"));

$brandID = $data -> brandId;
$name = $data -> name;
$imageUrl = $data -> imageUrl;
$price = $data -> price;
$discount = $data -> discount;
$qty = $data -> qty;
$rate = $data -> rate;
// $sale = false;
$created = date('Y-m-d H:i:s');

$query = "INSERT INTO `products` (`id`, `brandID`, `name`, `imageUrl`, `price`, `discount`, `qty`, `rate`, `sale`, `created`) 
VALUES (NULL, '$brandID', '$name', '$imageUrl', '$price', '$discount', '$qty', '$rate', 'false', '$created')";
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
