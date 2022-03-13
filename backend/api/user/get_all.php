<?php

header("Access-Control-Allow-Methods: GET");

require_once "../../config/access.php";
require_once "../../config/config.php";
require_once "../../helpers/CORS.php";
cors();

$query = 'SELECT * FROM users WHERE role="USER" ORDER BY created DESC';
$result = mysqli_query($conn, $query) or die("Select Query Failed");
$count = mysqli_num_rows($result);

if($count > 0) {

    $data = array();
    $i = 0;

    while ($row = $result->fetch_assoc()) {
        $data[$i]['id'] = $row['id'];
        $data[$i]['userName'] = $row['user_name'];
        $data[$i]['email'] = $row['email'];
        $data[$i]['phoneNumber'] = $row['phone_number'];
        $data[$i]['address'] = $row['address'];
        $data[$i]['fullName'] = $row['full_name'];        
        $i++;
    }
    echo json_encode($data);

}
else {
    http_response_code(404);
    echo json_encode(array("message" => "No Record Found"));
}

?>