<?php

header("Access-Control-Allow-Methods: POST, OPTIONS");

require_once "../../config/access.php";
require_once "../../config/config.php";
require_once "../../helpers/CORS.php";
cors();

$data = json_decode(file_get_contents("php://input"));
$user = $data->userName;
$pass = md5($data->password);

$query = "SELECT * FROM users WHERE user_name = '$user'";
$check_user_in_db = mysqli_query($conn, $query) or die("Select Query Failed");
$count = mysqli_num_rows($check_user_in_db);

if ($count > 0) {

    while ($row = $check_user_in_db->fetch_assoc()) {
        if ($row['password'] === $pass) {
            echo json_encode(array(
                "status" => true,
                "message" => "Login successful",
                "data" => $row
            ));
        } else {
            http_response_code(400);
            echo json_encode(array(
                "status" => false,
                "message" => "Invalid password"
            ));
        }
    }
} else {
    http_response_code(404);
    echo json_encode(array("message" => "User does not exist"));
}
