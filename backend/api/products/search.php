<?php

header("Access-Control-Allow-Methods: GET, OPTIONS");

require_once "../../config/access.php";
require_once "../../config/config.php";
require_once "../../helpers/CORS.php";
cors();

if (isset($_GET['q']) && $_GET['q']!="") {
    $keyword = $_GET['q'];
	$query = "SELECT * FROM products WHERE name LIKE '%".$keyword."%'";
	$result = mysqli_query($conn, $query) or die("Select Query Failed");
	$count = mysqli_num_rows($result);
	
	if($count > 0) {
	
		$product_arr = array();
	
		while ($row = $result->fetch_assoc()) {
			array_push($product_arr, $row);
		}
		echo json_encode($product_arr);
	
	}
	else {
		http_response_code(404);
		echo json_encode(array("message" => "No Record Found"));
	}
}

?>
