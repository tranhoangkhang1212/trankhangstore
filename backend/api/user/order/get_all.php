<?php

header("Access-Control-Allow-Methods: GET");

require_once "../../../config/access.php";
require_once "../../../config/config.php";
require_once "../../../helpers/CORS.php";
cors();

$query = 'SELECT * FROM orders ORDER BY created DESC';
$result = mysqli_query($conn, $query) or die("Select Query Failed");
$count = mysqli_num_rows($result);

if($count > 0) {

    $data = array();
    $i = 0;

    while ($row = $result->fetch_assoc()) {
        $data[$i]['id'] = $row['id'];
        $data[$i]['customerName'] = $row['customer_name'];
        $data[$i]['address'] = $row['address'];
        $data[$i]['phoneNumber'] = $row['phone_number'];
        $data[$i]['products'] = json_decode($row['products'], true);
        $data[$i]['total'] = $row['total'];
        $data[$i]['totalQty'] = $row['totalQty'];
        $data[$i]['payment'] = $row['payment'];
        $data[$i]['created'] = $row['created'];   
        $i++;         
    }
    echo json_encode($data);

}
else {
    http_response_code(404);
    echo json_encode(array("message" => "No Record Found"));
}
