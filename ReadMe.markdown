# Gestion des Classes et Étudiants

Ce projet vise à fournir une interface Web simple pour gérer les classes et les étudiants. Il utilise une API REST pour communiquer avec le serveur.

## Fonctionnalités

- Affichage de la liste des classes et des étudiants.
- Ajout d'une nouvelle classe.
- Ajout d'un nouvel étudiant.
- Modification des détails d'une classe.
- Modification des détails d'un étudiant.

## Utilisation

1. Démarrez le serveur :

    ```bash
     php -S localhost:8000 API/index.php
    ```

    Le serveur sera accessible à l'adresse [http://localhost:8000](http://localhost:8000).

2. Ouvrez le fichier `Front/index.html` dans votre navigateur pour accéder à l'interface.

3. Utilisez l'interface pour ajouter, afficher et modifier les classes et les étudiants.

## API Endpoints

- GET `/class`: Récupérer la liste des classes.
- POST `/class`: Ajouter une nouvelle classe.
- PUT `/class/:id`: Mettre à jour les détails d'une classe.
- GET `/students`: Récupérer la liste des étudiants.
- POST `/students`: Ajouter un nouvel étudiant.
- PUT `/students/:id`: Mettre à jour les détails d'un étudiant.

## Informations complémentaires

Ce projet a était réaliser par Julian Wicke dans le cadre d'un devoir.
