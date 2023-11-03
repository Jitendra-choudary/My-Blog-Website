<?php
// Establish a database connection
$servername = "localhost";
$username = "root";
$password = "1234";
$dbname = "blogs";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch blogs from the database
$sql = "SELECT * FROM blog_posts";
$result = $conn->query($sql);

$blogs = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $blogs[] = $row;
    }
}

// Close the database connection
$conn->close();

// Return the fetched blogs as JSON
header("Content-Type: application/json");
echo json_encode($blogs);