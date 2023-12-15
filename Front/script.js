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
    headerRow.innerHTML = '<th>Nom de la classe</th><th>Niveau</th><th>Actions</th>';
    classTable.appendChild(headerRow);

    // Parcours des classes
    for (var classId in classes) {
        if (classes.hasOwnProperty(classId)) {
            var classItem = classes[classId];

            // Création d'une ligne pour chaque classe
            var row = document.createElement('tr');
            row.innerHTML = '<td>' + classItem.name + '</td>' +
                            '<td>' + classItem.level + '</td>' +
                            '<td><button class="btn btn-primary" onclick="redirectToUpdatePageClass(' + classId + ')">Modifier</button></td>';

            classTable.appendChild(row);
        }
    }
}

// Fonction pour rediriger vers la page de mise à jour avec le formulaire pré-rempli
function redirectToUpdatePageClass(classId) {
    window.location.href = 'update-class/update-class.html?id=' + classId;
}

// Fonction pour récupérer le nom de la classe à partir de l'ID de classe
function getClassName(classId) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: 'http://localhost:8000/class',
            type: 'GET',
            success: function(response) {
                var className = response[classId].name;
                resolve(className);
            },
            error: function(error) {
                reject('Erreur lors de la récupération du nom de la classe:', error);
            }
        });
    });
}

// Fonction pour afficher la liste des étudiants en format tableau
async function displayStudentList(students) {
    var studentTable = document.getElementById('studentTable');
    studentTable.innerHTML = '';

    // Création de l'en-tête du tableau
    var headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>Nom</th><th>Prénom</th><th>Email</th><th>Téléphone</th><th>Adresse</th><th>Code Postal</th><th>Ville</th><th>Classe</th><th>Actions</th>';
    studentTable.appendChild(headerRow);

    // Parcours des étudiants
    for (var studentId in students) {
        if (students.hasOwnProperty(studentId)) {
            var studentItem = students[studentId];

            try {
                var className = await getClassName(studentItem.class);

                // Création d'une ligne pour chaque étudiant
                var row = document.createElement('tr');
                row.innerHTML = '<td>' + studentItem.lastname + '</td>' +
                                '<td>' + studentItem.firstname + '</td>' +
                                '<td>' + studentItem.email + '</td>' +
                                '<td>' + studentItem.phone + '</td>' +
                                '<td>' + studentItem.address + '</td>' +
                                '<td>' + studentItem.zip + '</td>' +
                                '<td>' + studentItem.city + '</td>' +
                                '<td>' + className + '</td>' +
                                '<td><button class="btn btn-primary" onclick="redirectToUpdatePageStudent(' + studentId + ')">Modifier</button></td>';

                studentTable.appendChild(row);
            } catch (error) {
                console.error(error);
            }
        }
    }
}


// Fonction pour rediriger vers la page de mise à jour avec le formulaire pré-rempli
function redirectToUpdatePageStudent(studentId) {
    window.location.href = 'update-student/update-student.html?id=' + studentId;
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

getClassList();
getStudentList();
