// Fonction pour récupérer la liste des classes depuis l'API
function getClassList() {
    $.ajax({
        url: 'http://localhost:8000/class',
        type: 'GET',
        success: function (response) {
            // Appel à la fonction pour afficher la liste des classes
            displayClassList(response);
        },
        error: function (error) {
            console.error('Erreur lors de la récupération de la liste des classes:', error);
        }
    });
}

// Fonction pour récupérer la liste des élèves depuis l'API
function getStudentList() {
    $.ajax({
        url: 'http://localhost:8000/students',
        type: 'GET',
        success: function (response) {
            // Appel à la fonction pour afficher la liste des élèves
            displayStudentList(response);
        },
        error: function (error) {
            console.error('Erreur lors de la récupération de la liste des élèves:', error);
        }
    });
}


// Fonction pour afficher la liste des classes en format tableau
function displayClassList(classes) {
    var classTable = document.getElementById('classTable');
    classTable.innerHTML = '';

    // Création de l'en-tête du tableau
    var headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>Nom de la classe</th><th>Niveau</th>';
    classTable.appendChild(headerRow);

    // Parcours des classes
    for (var classId in classes) {
        if (classes.hasOwnProperty(classId)) {
            var classItem = classes[classId];

            // Création d'une ligne pour chaque classe
            var row = document.createElement('tr');
            row.innerHTML = '<td>' + classItem.name + '</td>' +
                            '<td>' + classItem.level + '</td>';

            classTable.appendChild(row);
        }
    }
}


// Fonction pour afficher la liste des étudiants en format tableau
function displayStudentList(students) {
    var studentTable = document.getElementById('studentTable');
    studentTable.innerHTML = '';

    // Création de l'en-tête du tableau
    var headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>Nom</th><th>Prénom</th><th>Email</th><th>Téléphone</th><th>Adresse</th><th>Code Postal</th><th>Ville</th><th>Classe</th>';
    studentTable.appendChild(headerRow);

    // Parcours des étudiants
    for (var studentId in students) {
        if (students.hasOwnProperty(studentId)) {
            var studentItem = students[studentId];

            // Création d'une ligne pour chaque étudiant
            var row = document.createElement('tr');
            row.innerHTML = '<td>' + studentItem.lastname + '</td>' +
                            '<td>' + studentItem.firstname + '</td>' +
                            '<td>' + studentItem.email + '</td>' +
                            '<td>' + studentItem.phone + '</td>' +
                            '<td>' + studentItem.address + '</td>' +
                            '<td>' + studentItem.zip + '</td>' +
                            '<td>' + studentItem.city + '</td>' +
                            '<td>' + studentItem.class + '</td>';

            studentTable.appendChild(row);
        }
    }
}



getClassList();
getStudentList();
