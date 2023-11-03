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

// Get the blog ID from the query parameter
$blogId = $_GET['id'];

// Fetch the blog post from the database based on the blog ID
$sql = "SELECT * FROM blog_posts WHERE id = $blogId";
$result = $conn->query($sql);

$blog = null;
if ($result->num_rows > 0) {
    $blog = $result->fetch_assoc();
}

// Close the database connection
$conn->close();

// Return the fetched blog post as JSON
header("Content-Type: application/json");
echo json_encode($blog);