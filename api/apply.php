<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__ . '/classes/Database.php';
require __DIR__ . '/AuthMiddleware.php';

$allHeaders = getallheaders();
$db_connection = new Database();
$conn = $db_connection->dbConnection();
$auth = new Auth($conn, $allHeaders);

function msg($success, $status, $message, $extra = [])
{
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ], $extra);
}

if ($auth->isValid()['success'] == 1) {

    // DATA FORM REQUEST
    $data = json_decode(file_get_contents("php://input"));
    $returnData = [];

    if ($_SERVER["REQUEST_METHOD"] != "POST") :

        $returnData = msg(0, 403, 'Only POST method is allowed for this endpoint');

    elseif (
        !isset($data->course_id)
        || empty(trim($data->course_id))
    ) :
        $fields = ['fields' => ['course_id']];
        $returnData = msg(0, 422, 'Please Add the course ID!', $fields);

    // IF THERE ARE NO EMPTY FIELDS THEN-
    else :

        $course_id = trim($data->course_id);
        $user_id = $auth->isValid()['id'];
        try {
            // Check if course exists first
            $check_exists = "SELECT `course_name` FROM `courses` WHERE `id`=:id";
            $check_exists_stmt = $conn->prepare($check_exists);
            $check_exists_stmt->bindValue(':id', $course_id, PDO::PARAM_INT);
            $check_exists_stmt->execute();

            if (!$check_exists_stmt->rowCount() >= 1) :
                $returnData = msg(0, 422, 'This course does not exist!');

            else :
                // Check if user has registered the course already
                $check_course = "SELECT `course_id` FROM `course_user` WHERE `user_id`=:user_id AND `course_id`=:course_id";
                $check_course_stmt = $conn->prepare($check_course);
                $check_course_stmt->bindValue(':course_id', $course_id, PDO::PARAM_INT);
                $check_course_stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
                $check_course_stmt->execute();

                if ($check_course_stmt->rowCount()) :
                    $returnData = msg(0, 422, 'You haved applied for this course already!');

                else :
                    $insert_query = "INSERT INTO `course_user`(`course_id`,`user_id`) VALUES(:course_id,:user_id)";

                    $insert_stmt = $conn->prepare($insert_query);

                    // DATA BINDING
                    $insert_stmt->bindValue(':course_id', $course_id, PDO::PARAM_INT);
                    $insert_stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);

                    $insert_stmt->execute();

                    $returnData = msg(1, 201, 'You have successfully applied for this course.');

                endif;
            endif;
        } catch (PDOException $e) {
            $returnData = msg(0, 500, $e->getMessage());
        }
    endif;

    echo json_encode($returnData);
} else {
    echo json_encode(["success" => "You have to login first"]);
}
