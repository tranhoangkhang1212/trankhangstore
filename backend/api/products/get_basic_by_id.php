<?php

header("Access-Control-Allow-Methods: GET");

require_once "../../config/access.php";
require_once "../../config/config.php";
require_once "../../helpers/CORS.php";
cors();

if (isset($_GET['id']) && $_GET['id']!="") {
	$id = $_GET['id'];

	$query = "SELECT * FROM products WHERE products.id = '".$id."'";
	$result = mysqli_query($conn, $query) or die("Select Query Failed");
	$count = mysqli_num_rows($result);
	if($count > 0) {
	
		$data = array();
		$i = 0;
	
		while ($row = $result->fetch_assoc()) {

			$brandID = $row['brandID'];
			$brandName;

			$brand_query = "SELECT name FROM brands WHERE id = '$brandID'";
			$result_brand = mysqli_query($conn, $brand_query);

			foreach($result_brand as $key => $value) {
				$brandName = $value['name'];
			}

			$data[$i]['id'] = $row['id'];
			$data[$i]['brandID'] = $brandID;
			$data[$i]['brandName'] = $brandName;
			$data[$i]['name'] = $row['name'];
			$data[$i]['imageUrl'] = $row['imageUrl'];
			$data[$i]['price'] = $row['price'];
			$data[$i]['discount'] = $row['discount'];
			$data[$i]['rate'] = $row['rate'];
			$data[$i]['sale'] = $row['sale'];	
			$data[$i]['qty'] = $row['qty'];			
			$data[$i]['imgDetail'] = $row['imgDetail'];						
			$data[$i]['promotional'] = explode(';', $row['promotional']);
		}
		echo json_encode($data);
	
	}
	else {
		http_response_code(404);
		echo json_encode(array("message" => "No Record Found"));
	}
}

?>