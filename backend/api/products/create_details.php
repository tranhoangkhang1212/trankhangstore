<?php

header("Access-Control-Allow-Methods: POST, OPTIONS");

require_once "../../config/access.php";
require_once "../../config/config.php";
require_once "../../helpers/CORS.php";
cors();

$data = json_decode(file_get_contents("php://input"));

$productID = $data->productID;
$screen = $data->screen;
$OS = $data->OS;
$imgDetail = $data->imgDetail;
$frontCamera = $data->frontCamera;
$backCamera = $data->backCamera;
$chip = $data->chip;
$RAM = $data->RAM;
$ROM = $data->ROM;
$sim = $data->sim;
$battery = $data->battery;
$color = $data->color;
$warranty = $data->warranty;
$sets = $data->sets;
$promotional = $data->promotional;
$created = date('Y-m-d H:i:s');

$query = "INSERT INTO `product_detail` (`id`, `productID`, `screen`, `OS`, `imgDetail`, `frontCamera`, `backCamera`, `chip`, `RAM`, `ROM`, `sim`, `battery`, `color`, `warranty`, `sets`, `promotional`, `postID`, `created`) 
VALUES (NULL, '$productID', '$screen', '$OS', '$imgDetail', '$frontCamera', '$backCamera', '$chip', '$RAM', '$ROM', '$sim', '$battery', '$color', '$warranty', '$sets', '$promotional', NULL, '$created')";
$result = mysqli_query($conn, $query);

if ($result) {
    http_response_code(200);
    echo json_encode(array(
        "status" => true,
        "message" => "Product detail created"
    ));
} else {
    http_response_code(404);
    echo json_encode(array(
        "status" => false,
        "message" => "Product detail not created"
    ));
}
