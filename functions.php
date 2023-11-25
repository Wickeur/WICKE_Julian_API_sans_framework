<?php

/**
 * Fonction pour gérer les requêtes pour la route /class
 */
function handleClassRequest() {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $postData = json_decode(file_get_contents('php://input'), true);

        if (validateClassData($postData)) {
            $newClass = addClass($postData);
            echo json_encode($newClass);
            exit;
        } 
        else {
            http_response_code(400); // Bad Request
            echo json_encode(['error' => 'Données invalides pour l\'ajout de la classe']);
            exit;
        }
    } else {
        global $data;
        $data = readCSV("CSV/class.csv");
    }
}

/**
 * Fonction pour gérer les requêtes pour la route /students
 */
function handleStudentRequest() {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $postData = json_decode(file_get_contents('php://input'), true);

        if (validateStudentData($postData)) {
            $newStudent = addStudent($postData);
            echo json_encode($newStudent);
            exit;
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(['error' => 'Données invalides pour l\'ajout de l\'étudiant']);
            exit;
        }
    } else {
        global $data;
        $data = readCSV("CSV/students.csv");
    }
}

/**
 * Fonction pour valider les données pour l'ajout d'une classe
 */
function validateClassData($data) {
    return isset($data['name']) && isset($data['level']);
}

/**
 * Fonction pour valider les données pour l'ajout d'un étudiant
 */
function validateStudentData($data) {
    return isset($data['lastname']) && isset($data['firstname']) &&
        isset($data['email']) && isset($data['phone']) &&
        isset($data['address']) && isset($data['zip']) &&
        isset($data['city']) && isset($data['class']);
}

/**
 * Fonction pour ajouter une classe
 */
function addClass($data) {
    $lastId = getLastClassId("CSV/class.csv");
    $newClass = [$lastId + 1, $data['name'], $data['level']];
    saveFile("CSV/class.csv", $newClass);
    return $newClass;
}

/**
 * Fonction pour ajouter un étudiant
 */
function addStudent($data) {
    $lastId = getLastClassId("CSV/students.csv");
    $newStudent = [
        $lastId + 1,
        $data['lastname'],
        $data['firstname'],
        $data['email'],
        $data['phone'],
        $data['address'],
        $data['zip'],
        $data['city'],
        $data['class']
    ];
    saveFile("CSV/students.csv", $newStudent);
    return $newStudent;
}

/**
 * Fonction pour rechercher un élément dans un tableau 
 */
function searchById($dataArray, $id) {
    return array_values(array_filter($dataArray, function ($item) use ($id) {
        return $item[0] == $id;
    }));
}

/**
 * Fonction pour récupérer la dernière ID existante dans un fichier CSV
 * @param string $fichier_csv Chemin vers le fichier CSV
 */
function getLastClassId($fichier_csv) {
    $classes = readCSV($fichier_csv);
    if (!empty($classes)) {
        // Récupérer la dernière ID existante
        $lastClass = end($classes);
        return $lastClass[0];
    }
    return 0; // Retourne 0 si le fichier est vide
}

/**
 * Fonction pour sauvegarder les données dans un fichier CSV
 * @param string $fichier_csv Chemin vers le fichier CSV
 * @param array $data Données à sauvegarder
 */
function saveFile($fichier_csv, $data) {
    $csvFile = fopen($fichier_csv, "a"); 
    fputcsv($csvFile, $data);
    fclose($csvFile);
}

/**
 * Fonction pour lire les données à partir d'un fichier CSV (en retirant la première ligne)
 * @param string $filename Chemin vers le fichier CSV
 **/ 
function readCSV($filename) {
    $csvData = [];
    $handle = fopen($filename, "r");

    if ($handle === FALSE) {
        // Gérer l'erreur d'ouverture de fichier
        http_response_code(500); // Erreur interne du serveur
        echo json_encode(['error' => 'Erreur lors de l\'ouverture du fichier CSV']);
        exit;
    }

    fgetcsv($handle, 1000, ",");
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $csvData[] = $data;
    }

    fclose($handle);
    return $csvData;
}

function handleClassRequestPut($classId){
    if($_SERVER['REQUEST_METHOD'] === 'PUT'){
        $putData = json_decode(file_get_contents('php://input'), true);

        if (validateClassData($putData)) {
            updateClass($classId, $putData);
            echo json_encode(['message' => 'Classe mise à jour avec succès']);
            exit;
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(['error' => 'Données invalides pour la mise à jour de la classe']);
            exit;
        }
    }
}

function handleStudentsRequestPut($studentId){
    if($_SERVER['REQUEST_METHOD'] === 'PUT'){
        $putData = json_decode(file_get_contents('php://input'), true);

        if (validateStudentData($putData)) {
            updateStudent($studentId, $putData);
            echo json_encode(['message' => 'Etudiant mis à jour avec succès']);
            exit;
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(['error' => 'Données invalides pour la mise à jour de l\'étudiant']);
            exit;
        }
    }
}

/**
 * Fonction pour mettre à jour une classe
 */
function updateClass($classId, $data) {
    $classes = readCSV("CSV/class.csv");

    $classUpdated = false;

    foreach ($classes as &$class) {
        if ($class[0] == $classId) {
            $class = [$class[0], $data['name'], $data['level']];
            $classUpdated = true;
            break;
        }
    }

    if (!$classUpdated) {
        http_response_code(404); // Not Found
        echo json_encode(['error' => 'ID de classe non trouvé pour la mise à jour']);
        exit;
    }

    // Sauvegarder toutes les données
    editClass("CSV/class.csv", $classes);
}

/**
 * Fonction pour mettre à jour un étudiant
 */
function updateStudent($studentId, $data) {
    $students = readCSV("CSV/students.csv");

    $studentUpdated = false;

    foreach ($students as &$student) {
        if ($student[0] == $studentId) {
            $student = [
                $student[0],
                $data['lastname'],
                $data['firstname'],
                $data['email'],
                $data['phone'],
                $data['address'],
                $data['zip'],
                $data['city'],
                $data['class']
            ];
            $studentUpdated = true;
            break;
        }
    }

    if (!$studentUpdated) {
        http_response_code(404); // Not Found
        echo json_encode(['error' => 'ID d\'étudiant non trouvé pour la mise à jour']);
        exit;
    }

    // Sauvegarder toutes les données
    editStudent("CSV/students.csv", $students);
}

/**
 * Fonction pour sauvegarder la classe
 * @param string $fichier_csv Chemin vers le fichier CSV
 * @param array $data Données à sauvegarder
 */
function editClass($fichier_csv, $data) {    
    $csvFile = fopen($fichier_csv, "w"); // Utilise le mode "w" pour vider le fichier avant d'écrire

    //Réécrit la 1er ligne
    fputcsv($csvFile, ["id", "name", "level"]);

    foreach ($data as $row) {
        fputcsv($csvFile, $row);
    }
    fclose($csvFile);
}

/**
 * Fonction pour sauvegarder l'étudiant
 * @param string $fichier_csv Chemin vers le fichier CSV
 * @param array $data Données à sauvegarder
 */
function editStudent($fichier_csv, $data) {    
    $csvFile = fopen($fichier_csv, "w"); // Utilise le mode "w" pour vider le fichier avant d'écrire

    //Réécrit la 1er ligne
    fputcsv($csvFile, ["id", "lastname", "firstname", "email", "phone", "address", "zip", "city", "class"]);

    foreach ($data as $row) {
        fputcsv($csvFile, $row);
    }
    fclose($csvFile);
}

function getDataClass(){
    $data = [];

    if (($handle = fopen("CSV/class.csv", 'r')) !== false) {
        while (($row = fgetcsv($handle, 1000, ',')) !== false) {
            // On saute la 1er ligne
            if ($row[0] === 'id') {
                continue;
            }
            // Vérification du nombre de colonnes
            if (count($row) === 3) {
                $id = $row[0];
                $data[$id] = [
                    'name' => $row[1],
                    'level' => $row[2],
                ];
            } 
        }
        fclose($handle);
    } else {
        // Gestion de l'erreur lors de l'ouverture du fichier
        die("Erreur lors de l'ouverture du fichier CSV.");
    }

    return $data;
}

function handleClassRequestPatch($classId){
    if($_SERVER['REQUEST_METHOD'] === 'PATCH'){
        $patchData = json_decode(file_get_contents('php://input'), true);

        // On détermine quelles données ont été envoyées
        // echo json_encode($patchData);    

        $data = getDataClass();
        // on détermine si name existe
        if(isset($patchData['name'])){
            $data[$classId]['name'] = $patchData['name'];
        }
        // on détermine si level existe
        if(isset($patchData['level'])){
            $data[$classId]['level'] = $patchData['level'];
        }
        echo json_encode($data[$classId]);

        // On réécrit le fichier CSV
        $csvFile = fopen("CSV/class.csv", "w"); // Utilise le mode "w" pour vider le fichier avant d'écrire

        //Réécrit la 1er ligne
        fputcsv($csvFile, ["id", "name", "level"]);

        $i = 0;
        foreach ($data as $row) {
            $i++;
            fputcsv($csvFile, [$i, $row['name'], $row['level']]);
        }
        fclose($csvFile);
    }
}
