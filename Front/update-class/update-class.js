// Récupérez les paramètres d'URL
const urlParams = new URLSearchParams(window.location.search);
const classId = urlParams.get('id');

// Fonction pour récupérer les informations de la classe depuis l'API
function getClassDetails() {
    $.ajax({
        url: 'http://localhost:8000/class' ,
        type: 'GET',
        success: function(classDetails) {
            // On récupère seulement les informations de la classe qui nous intéresse
            classDetails = classDetails[classId];
            console.log('Détails de la classe:', classDetails);

            // Appel à la fonction pour pré-remplir le formulaire
            populateClassForm(classDetails);
        },
        error: function(error) {
            console.error('Erreur lors de la récupération des détails de la classe:', error);
        }
    });
}

// Fonction pour pré-remplir le formulaire avec les informations de la classe
function populateClassForm(classDetails) {
    document.getElementById('updateClassName').value = classDetails.name;
    document.getElementById('updateClassLevel').value = classDetails.level;
}

// Fonction pour mettre à jour la classe
function updateClass() {
    $.ajax({
        url: 'http://localhost:8000/class/' + classId,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({
            name: document.getElementById('updateClassName').value,
            level: document.getElementById('updateClassLevel').value
        }),
        success: function(response) {
            // Redirigez l'utilisateur vers la page de la liste des classes après la mise à jour
            window.location.href = '../index.html';
        },
        error: function(error) {
            console.error('Erreur lors de la mise à jour de la classe:', error);
        }
    });
}

// Appel à la fonction pour récupérer les informations de la classe au chargement de la page
getClassDetails();
