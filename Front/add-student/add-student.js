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
            // rediriger l'utilisateur vers la page de la liste des étudiants après la mise à jour
            window.location.href = '../index.html';
        },
        error: function (error) {
            console.error('Erreur lors de l\'ajout de l\'étudiant:', error);
        }
    });
}