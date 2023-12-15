<?php

require_once 'API/functions.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


$uri = $_SERVER['REQUEST_URI'];
$data = [];

switch ($uri) {
    case '/class':
        handleClassRequest();
        echo json_encode(getDataClass());
        break;

    case '/students':
        handleStudentRequest();
        echo json_encode(getDataStudents());
        break;

    case preg_match('/\/class\/(\d+)/', $uri, $matches) ? true : false:
        $classId = $matches[1];
        if($_SERVER['REQUEST_METHOD'] === 'GET') {
            $data = searchById(readCSV("CSV/class.csv"), $classId);
        }
        handleClassRequestPut($classId);
        handleClassRequestPatch($classId);
        break;
    
    case preg_match('/\/students\/(\d+)/', $uri, $matches) ? true : false:
        $studentId = $matches[1];
        if($_SERVER['REQUEST_METHOD'] === 'GET') {
            $data = searchById(readCSV("CSV/students.csv"), $studentId);
        }
        handleStudentRequestPut($studentId);
        handleStudentRequestPatch($studentId);
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Route non reconnue']);
        exit;
}
