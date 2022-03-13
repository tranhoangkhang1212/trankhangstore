<?php

header("Access-Control-Allow-Methods: POST, OPTIONS");

require_once "../../config/access.php";
require_once "../../config/config.php";
require_once "../../helpers/CORS.php";
cors();

$data = json_decode(file_get_contents("php://input"));
$title = $data -> title;
$summary = $data -> summary;
$content = $data -> content;
$image = $data -> image;
$author = $data -> author;
$type = $data -> type;

$created = date('Y-m-d H:i:s');

$query = "INSERT INTO `news` (`id`, `title`, `summary`, `content`, `image`, `author`, `type`, `created`) 
VALUES (NULL, '$title', '$summary', '$content', '$image', '$author', '$type', '$created')";
$result = mysqli_query($conn, $query);

if ($result) {
    http_response_code(200);
    echo json_encode(array(
        "status" => true,
        "message" => "Post created"
    ));
} else {
    http_response_code(404);
    echo json_encode(array(
        "status" => false,
        "message" => "Post not created"
    ));
}
