<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__.'/classes/Database.php';

$allHeaders = getallheaders();
$db_connection = new Database();
$conn = $db_connection->dbConnection();



// Get the search term from the query parameter 'q'
$searchTerm = isset($_GET['q']) ? $_GET['q'] : '';

try {
    // Prepare the query to search for courses by title
    $query = "SELECT * FROM courses WHERE course_name LIKE :searchTerm";

    // Prepare the statement
    $statement = $conn->prepare($query);

    // Bind the search term with the wildcard %
    $searchTermWithWildcards = '%' . $searchTerm . '%';
    $statement->bindParam(':searchTerm', $searchTermWithWildcards);

    // Execute the query
    $statement->execute();

    // Fetch the matching courses as an associative array
    $courses = $statement->fetchAll(PDO::FETCH_ASSOC);

    // Close the database connection
    $connection = null;

    // Check if there are any matching courses
    if (count($courses) > 0) {
        // Convert the courses array to JSON
        $json = json_encode($courses);

        // Output the JSON data
        echo $json;
    } else {
        // If no matching courses found, return an empty JSON array
        echo json_encode([]);
    }
} catch (PDOException $e) {
    die('Error: ' . $e->getMessage());
}
