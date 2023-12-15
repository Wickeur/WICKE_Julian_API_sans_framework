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

// Fonction pour ajouter une classe
function addClass() {
    var className = document.getElementById('className').value;
    var classLevel = document.getElementById('classLevel').value;

    // Exemple avec jQuery
    $.ajax({
        url: 'http://localhost:8000/class',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ name: className, level: classLevel }),
        success: function(response) {
            // Rechargez la page après l'ajout de la classe
            location.reload();
        },
        error: function(error) {
            console.error('Erreur lors de l\'ajout de la classe:', error);
        }
    });
}

// Fonction pour ajouter un étudiant
function addStudent() {
    var studentLastName = document.getElementById('studentLastName').value;
    var studentFirstName = document.getElementById('studentFirstName').value;
    var studentEmail = document.getElementById('studentEmail').value;
    var studentPhone = document.getElementById('studentPhone').value;
    var studentAddress = document.getElementById('studentAddress').value;
    var studentZip = document.getElementById('studentZip').value;
    var studentCity = document.getElementById('studentCity').value;
    var studentClass = document.getElementById('studentClass').value;

    // Effectuez une requête AJAX vers votre API pour ajouter l'étudiant
    // Utilisez la méthode POST et envoyez les données au format JSON

    // Exemple avec jQuery
    $.ajax({
        url: 'http://localhost:8000/students',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            lastname: studentLastName,
            firstname: studentFirstName,
            email: studentEmail,
            phone: studentPhone,
            address: studentAddress,
            zip: studentZip,
            city: studentCity,
            class: studentClass
        }),
        success: function (response) {
            // Actualisez la liste des étudiants après l'ajout
            getStudentList();
        },
        error: function (error) {
            console.error('Erreur lors de l\'ajout de l\'étudiant:', error);
        }
    });
}



getClassList();
getStudentList();
