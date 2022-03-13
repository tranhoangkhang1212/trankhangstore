<?php

header("Access-Control-Allow-Methods: PATCH, OPTIONS");

require_once "../../config/access.php";
require_once "../../config/config.php";
require_once "../../helpers/CORS.php";
cors();

$data = json_decode(file_get_contents("php://input"));

$id = $data->productID;
$arr = array(
    "screen" => $data->screen,
    "OS" => $data->OS,
    "imgDetail" => $data->imgDetail,
    "frontCamera" => $data->frontCamera,
    "backCamera" => $data->backCamera,
    "chip" => $data->chip,
    "RAM" => $data->RAM,
    "ROM" => $data->ROM,
    "sim" => $data->sim,
    "battery" => $data->battery,
    "color" => $data->color,
    "warranty" => $data->warranty,
    "sets" => $data->sets,
    "promotional" => $data->promotional
);

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

$query_check_empty = "SELECT * FROM product_detail WHERE productID = '" . $id . "'";
$result_check_empty = mysqli_query($conn, $query_check_empty) or die("Select Query Failed");
$count = mysqli_num_rows($result_check_empty);

if ($count > 0) {
    foreach ($arr as $key => $value) {
        if ($value !== '') {
            $query = "UPDATE `product_detail` SET `$key` = '$value' WHERE productID = '$id'";
            $result = mysqli_query($conn, $query);
        } else {
            http_response_code(403);
        }
    }
} else {
    $query_create = "INSERT INTO `product_detail` (`id`, `productID`, `screen`, `OS`, `imgDetail`, `frontCamera`, `backCamera`, `chip`, `RAM`, `ROM`, `sim`, `battery`, `color`, `warranty`, `sets`, `promotional`, `postID`, `created`) 
        VALUES (NULL, '$productID', '$screen', '$OS', '$imgDetail', '$frontCamera', '$backCamera', '$chip', '$RAM', '$ROM', '$sim', '$battery', '$color', '$warranty', '$sets', '$promotional', NULL, '$created')";
    $result = mysqli_query($conn, $query_create);
}

if ($result) {
    http_response_code(200);
    echo json_encode(array(
        "status" => true,
        "message" => "Product updated"
    ));
} else {
    http_response_code(404);
    echo json_encode(array(
        "status" => false,
        "message" => "Product not updated"
    ));
}
