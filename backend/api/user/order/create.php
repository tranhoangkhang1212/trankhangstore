<?php

header("Access-Control-Allow-Methods: POST, OPTIONS");

require_once "../../../config/access.php";
require_once "../../../config/config.php";
require_once "../../../helpers/CORS.php";
cors();

$data = json_decode(file_get_contents("php://input"));

$customer_name = $data->customerName;
$address = $data->address;
$phone_number = $data->phoneNumber;
$products = json_encode($data->products);
$product_arr = $data->products;
$totalQty = $data->totalQty;
$total = $data->total;
$created = date('Y-m-d H:i:s');

foreach ($product_arr as $key => $value) {
    $id = $value -> id;
    $qty = $value -> qty;
    $update_qty_query = "UPDATE `products` SET `qty` = qty - $qty WHERE products.id = $id";
    mysqli_query($conn, $update_qty_query);
}

$query = "INSERT INTO `orders` (`id`, `customer_name`, `address`, `phone_number`, `products`, `totalQty`, `total`, `payment`, `created`)
VALUES (NULL, '$customer_name', '$address', '$phone_number', '$products', '$totalQty' , '$total', 'false', '$created')";
$result = mysqli_query($conn, $query);

if ($result) {
    echo json_encode(array(
        "status" => true,
        "message" => "Order created"
    ));
}else {
    http_response_code(404);
    echo json_encode(array(
        "status" => false,
        "message" => "Order not created"
    ));
}
