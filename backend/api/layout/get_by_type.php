<?php

header("Access-Control-Allow-Methods: GET");

require_once "../../config/access.php";
require_once "../../config/config.php";
require_once "../../helpers/CORS.php";
cors();

if ((isset($_GET['type']) && $_GET['type'] != "") 
    && (isset($_GET['hide']) && $_GET['hide'] != "")
    && (isset($_GET['qty']) && $_GET['qty'] != "")) {

    $quantity = $_GET['qty'];
    $hide = $_GET['hide'];
    $type = $_GET['type'];

    $query = "SELECT layout.id AS id, layout_type.name AS type_name,
            layout.image AS image, layout.hide AS hide, layout.created AS created
    FROM layout INNER JOIN layout_type ON layout.type = layout_type.id
    WHERE layout_type.name = '$type' AND hide = '$hide' ORDER BY created DESC LIMIT $quantity";

    $result = mysqli_query($conn, $query) or die("Select Query Failed");
    $count = mysqli_num_rows($result);

    if ($count > 0) {

        $data = array();

        while ($row = $result->fetch_assoc()) {
            array_push($data, $row);
        }
        echo json_encode($data);
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "No Record Found"));
    }
}
