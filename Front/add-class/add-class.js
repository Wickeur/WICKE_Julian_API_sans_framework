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
        success: function (response) {
            // Redirigez l'utilisateur vers la page de la liste des classes après la mise à jour
            window.location.href = '../index.html';
        },
        error: function (error) {
            console.error('Erreur lors de l\'ajout de la classe:', error);
        }
    });
}
