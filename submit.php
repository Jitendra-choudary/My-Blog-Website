<?php
$servername = 'localhost';
$username = 'root';
$password = '1234';
$dbname = 'blogs';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$title = $_POST['title'];
$content = $_POST['content'];
$author = $_POST['author'];

$title = str_replace(" ", "-", $title);

if (isset($_FILES['banner']) && $_FILES['banner']['error'] === UPLOAD_ERR_OK) {
    $bannerimage = $_FILES['banner']['name'];
    $bannertemp = $_FILES['banner']['tmp_name'];
    $bannerdestination = "img/" . $bannerimage;

    if (move_uploaded_file($bannertemp, $bannerdestination) == false) {
        echo 'Error uploading banner image';
    }
} else {
    echo 'Error uploading banner image';
}

$sql = "INSERT INTO blog_posts (title, content, main_image_id, author) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ssss', $title, $content, $bannerdestination, $author);
if ($stmt->execute() == false) {
    echo 'Error: ' . $stmt->error;
} else {
    // Redirect the user to home.html
    header("Location: home.html");
    exit();
}

$stmt->close();
$conn->close();
