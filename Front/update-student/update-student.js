// Récupérez les paramètres d'URL
const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get('id');

// Fonction pour récupérer les informations de l'étudiant depuis l'API
function getStudentDetails() {
    $.ajax({
        url: 'http://localhost:8000/students',
        type: 'GET',
        success: function (students) {
            // On récupère seulement les informations de l'étudiant qui nous intéresse
            const studentDetails = students[studentId];
            console.log('Détails de l\'étudiant:', studentDetails);

            // Appel à la fonction pour pré-remplir le formulaire
            populateStudentForm(studentDetails);
        },
        error: function (error) {
            console.error('Erreur lors de la récupération des détails de l\'étudiant:', error);
        }
    });
}

// Fonction pour pré-remplir le formulaire avec les informations de l'étudiant
function populateStudentForm(studentDetails) {
    document.getElementById('updateStudentFirstName').value = studentDetails.firstname;
    document.getElementById('updateStudentLastName').value = studentDetails.lastname;
    document.getElementById('updateStudentEmail').value = studentDetails.email;
    document.getElementById('updateStudentPhone').value = studentDetails.phone;
    document.getElementById('updateStudentAddress').value = studentDetails.address;
    document.getElementById('updateStudentZip').value = studentDetails.zip;
    document.getElementById('updateStudentCity').value = studentDetails.city;
    document.getElementById('updateStudentClass').value = studentDetails.class;
}

// Fonction pour mettre à jour l'étudiant
function updateStudent() {
    $.ajax({
        url: 'http://localhost:8000/students/' + studentId,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({
            firstname: document.getElementById('updateStudentFirstName').value,
            lastname: document.getElementById('updateStudentLastName').value,
            email: document.getElementById('updateStudentEmail').value,
            phone: document.getElementById('updateStudentPhone').value,
            address: document.getElementById('updateStudentAddress').value,
            zip: document.getElementById('updateStudentZip').value,
            city: document.getElementById('updateStudentCity').value,
            class: document.getElementById('updateStudentClass').value
        }),
        success: function (response) {
            // Redirigez l'utilisateur vers la page de la liste des étudiants après la mise à jour
            window.location.href = '../index.html';
        },
        error: function (error) {
            console.error('Erreur lors de la mise à jour de l\'étudiant:', error);
        }
    });
}

// Appel à la fonction pour récupérer les informations de l'étudiant au chargement de la page
getStudentDetails();
