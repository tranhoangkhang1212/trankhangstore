<?php

header("Access-Control-Allow-Methods: POST, OPTIONS");

require_once "../../config/access.php";
require_once "../../config/config.php";
require_once "../../helpers/CORS.php";
cors();

$data = json_decode(file_get_contents("php://input"));

$user_name = $data -> userName;
$password = md5($data -> password);
$email = $data -> email;
$phone_number = $data -> phoneNumber;
$address = $data -> address;
$full_name = $data -> fullName;
$created = date('Y-m-d H:i:s'); 

$select = "SELECT user_name, email, phone_number FROM users WHERE (user_name = '$user_name' OR email = '$email' OR phone_number = '$phone_number' ) ";
$result_select = mysqli_query($conn, $select) or die("Select Query Failed");
$count = mysqli_num_rows($result_select);

if( $count > 0 ) {
    http_response_code(406);
    echo json_encode(array(
        "status" => false,
        "message" => "User already exist"
    ));
} else {
    $query = "INSERT INTO `users` (`id`, `user_name`, `password`,`email`,`phone_number` ,`address`, `full_name`, `ROLE` ,`created`) 
    VALUES (NULL, '$user_name', '$password', '$email','$phone_number' ,'$address','$full_name','USER', '$created')";
    $result = mysqli_query($conn, $query);

    if ($result) {
        echo json_encode(array(
            "status" => true,
            "message" => "Register successful"
        ));
    }else {
        http_response_code(404);
        echo json_encode(array(
            "status" => false,
            "message" => "Register failed"
        ));
    }
}
?>