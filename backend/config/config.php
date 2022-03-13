<?php 

$host = 'localhost';
$user = 'root';
$password = '';
$dbName = 'trankhang_store';

$conn = mysqli_connect($host, $user, $password, $dbName);
mysqli_set_charset($conn, "utf8");
if(!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

?>