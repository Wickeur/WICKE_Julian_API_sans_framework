<?php

require_once 'functions.php';

header("Content-Type: application/json");

$uri = $_SERVER['REQUEST_URI'];
$data = [];

switch ($uri) {
    case '/class':
        handleClassRequest();
        break;

    case '/students':
        handleStudentRequest();
        break;

    case preg_match('/\/class\/(\d+)/', $uri, $matches) ? true : false:
        $classId = $matches[1];
        if($_SERVER['REQUEST_METHOD'] === 'GET') {
            $data = searchById(readCSV("CSV/class.csv"), $classId);
        }
        handleClassRequestPut($classId);
        break;
    
    case preg_match('/\/students\/(\d+)/', $uri, $matches) ? true : false:
        $studentId = $matches[1];
        if($_SERVER['REQUEST_METHOD'] === 'GET') {
            $data = searchById(readCSV("CSV/students.csv"), $studentId);
        }
        handleStudentsRequestPut($studentId);
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Route non reconnue']);
        exit;
}

echo json_encode($data);

