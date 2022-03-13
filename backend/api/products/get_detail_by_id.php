<?php

header("Access-Control-Allow-Methods: GET");

require_once "../../config/access.php";
require_once "../../config/config.php";
require_once "../../helpers/CORS.php";
cors();

if (isset($_GET['id']) && $_GET['id']!="") {
	$id = $_GET['id'];

	$query = "SELECT * FROM products INNER JOIN product_detail ON products.id = product_detail.productID 
	WHERE products.id = $id";
	$result = mysqli_query($conn, $query) or die("Select Query Failed");
	$count = mysqli_num_rows($result);

	$query_detail = "SELECT * FROM product_detail WHERE productID = '".$id."'";
	$result_detail = mysqli_query($conn, $query_detail) or die("Select Query Failed");

    // 
    $query_basic = "SELECT * FROM products WHERE products.id = $id";
	$result_basic = mysqli_query($conn, $query_basic) or die("Select Query Failed");
	$count_basic = mysqli_num_rows($result_basic);
    // 
	
	if($count > 0) {
	
		$data = array();
		$detail_data = array();
		$i = 0;

		while ($row = $result_detail->fetch_assoc()) {
			$detail_data = array(
                "screen" => $row['screen'],
                "OS" => $row['OS'],
                "frontCamera" => $row['frontCamera'],
                "backCamera" => $row['backCamera'],
                "chip" => $row['chip'],
                "RAM" => $row['RAM'],
                "ROM" => $row['ROM'],
                "sim" => $row['sim'],
                "battery" => $row['battery'],
            );
		}
	
		while ($row = $result->fetch_assoc()) {

			$brandID = $row['brandID'];
			$brandName;

			$brand_query = "SELECT name FROM brands WHERE id = '$brandID'";
			$result_brand = mysqli_query($conn, $brand_query);

			foreach($result_brand as $key => $value) {
				$brandName = $value['name'];
			}

			$data[$i]['id'] = $row['productID'];
			$data[$i]['brandID'] = $brandID;
			$data[$i]['brandName'] = $brandName;
			$data[$i]['name'] = $row['name'];
			$data[$i]['imageUrl'] = $row['imageUrl'];
			$data[$i]['price'] = $row['price'];
			$data[$i]['discount'] = $row['discount'];
			$data[$i]['rate'] = $row['rate'];
			$data[$i]['sale'] = $row['sale'];			
			$data[$i]['imgDetail'] = $row['imgDetail'];			
			$data[$i]['color'] = $row['color'];
			$data[$i]['warranty'] = $row['warranty'];
			$data[$i]['sets'] = $row['sets'];
			$data[$i]['detail'] = $detail_data;
			$data[$i]['promotional'] = explode(',', $row['promotional']);
		}
		echo json_encode($data);
	
	}
	else if ($count_basic > 0) {
        $data = array();
		$i = 0;
	
		while ($row = $result_basic->fetch_assoc()) {

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
			$data[$i]['imgDetail'] = $row['imgDetail'];						
			$data[$i]['promotional'] = explode(';', $row['promotional']);
		}
		echo json_encode($data);
	} else {
		http_response_code(404);
		echo json_encode(array("message" => "No Record Found"));
	}
}

?>