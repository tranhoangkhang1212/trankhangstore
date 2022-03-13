<?php
header("Access-Control-Allow-Methods: GET");

require_once "../../config/access.php";
require_once "../../config/config.php";
require_once "../../helpers/CORS.php";
cors();

if (isset($_GET['id']) && $_GET['id'] != "") {
    $id = $_GET['id'];

    $query = "SELECT * FROM brands WHERE id = $id";
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
