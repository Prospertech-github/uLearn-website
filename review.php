<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__ . '/classes/Database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

function msg($success, $status, $message, $extra = [])
{
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ], $extra);
}

// DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));
$returnData = [];

if ($_SERVER["REQUEST_METHOD"] != "POST") :

    $returnData = msg(0, 403, 'Only POST method is allowed for this endpoint');

elseif (
    !isset($data->name)
    || !isset($data->email)
    || !isset($data->subject)
    || !isset($data->comment)
    || empty(trim($data->name))
    || empty(trim($data->email))
    || empty(trim($data->subject))
    || empty(trim($data->comment))
) :

    $fields = ['fields' => ['name', 'email', 'subject', 'comment']];
    $returnData = msg(0, 422, 'Please Fill in all Required Fields!', $fields);

// IF THERE ARE NO EMPTY FIELDS THEN-
else :

    $name = trim($data->name);
    $email = trim($data->email);
    $subject = trim($data->subject);
    $comment = trim($data->comment);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) :
        $returnData = msg(0, 422, 'Invalid Email Address!');

    elseif (strlen($name) < 3) :
        $returnData = msg(0, 422, 'Your name must be at least 3 characters long!');

    elseif (strlen($subject) < 3) :
        $returnData = msg(0, 422, 'Your subject must be at least 3 characters long!');

    elseif (strlen($comment) < 3) :
        $returnData = msg(0, 422, 'Your comment must be at least 3 characters long!');

    else :
        try {
            $insert_query = "INSERT INTO `reviews`(`name`,`email`,`subject`,`comment`) VALUES(:name,:email,:subject,:comment)";

            $insert_stmt = $conn->prepare($insert_query);

            // DATA BINDING
            $insert_stmt->bindValue(':name', htmlspecialchars(strip_tags($name)), PDO::PARAM_STR);
            $insert_stmt->bindValue(':email', $email, PDO::PARAM_STR);
            $insert_stmt->bindValue(':subject', htmlspecialchars(strip_tags($subject)), PDO::PARAM_STR);
            $insert_stmt->bindValue(':comment', htmlspecialchars(strip_tags($comment)), PDO::PARAM_STR);


            $insert_stmt->execute();

            $returnData = msg(1, 201, 'You review have been submitted successfully.');
        } catch (PDOException $e) {
            $returnData = msg(0, 500, $e->getMessage());
        }
    endif;
endif;

echo json_encode($returnData);
