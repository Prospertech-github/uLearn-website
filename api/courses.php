<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__.'/classes/Database.php';
require __DIR__.'/AuthMiddleware.php';

$allHeaders = getallheaders();
$db_connection = new Database();
$conn = $db_connection->dbConnection();
$auth = new Auth($conn, $allHeaders);

if($auth->isValid()['success'] == 1) {
    
    // Query to fetch all courses
    $query = "SELECT * FROM courses";

    // Prepare the statement
    $statement = $conn->prepare($query);

    // Execute the query
    $statement->execute();

    // Fetch all courses as an associative array
    $courses = $statement->fetchAll(PDO::FETCH_ASSOC);

    // Close the database connection
    $conn = null;

    // Check if there are any courses
    if (count($courses) > 0) {
        // Convert the courses array to JSON
        $json = json_encode($courses);

        // Output the JSON data
        echo $json;
    } else {
        echo json_encode([]);
    }
} else {
    echo json_encode(["success" => "You have to login first"]);
}
    