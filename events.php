<?php
// Connexion à la base de données
require 'includes/database.php';
session_start();

try {
    // Récupérer les événements depuis la base de données
    $stmt = $pdo->query("SELECT title, date, description FROM events ORDER BY date DESC");
    $events = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    $events = [];
    error_log("Erreur lors de la récupération des événements : " . $e->getMessage());
}

// Gestion du formulaire d'ajout d'événement
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_event'])) {
    $title = $_POST['title'];
    $start_date = $_POST['start_date'];
    $end_date = $_POST['end_date'];
    $start_time = $_POST['start_time'];
    $end_time = $_POST['end_time'];
    $prize = $_POST['prize'];
    $description = $_POST['description'];

    try {
        $stmt = $pdo->prepare("INSERT INTO events (title, date, description) VALUES (:title, :date, :description)");
        $stmt->execute([
            ':title' => $title,
            ':date' => "$start_date $start_time - $end_date $end_time",
            ':description' => "$description (Lot : $prize)"
        ]);
        header("Location: events.php");
        exit();
    } catch (PDOException $e) {
        error_log("Erreur lors de l'ajout d'un événement : " . $e->getMessage());
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Événements - Exilium Carnage</title>
    <link rel="stylesheet" href="style.css">
    <style>
        /* Section principale */
        .events-section {
            padding: 40px;
            text-align: center;
            background-color: #111;
            color: white;
        }

        .events-section h1 {
            font-size: 2.5rem;
            color: #ff4d4d;
            margin-bottom: 20px;
        }

        /* Bouton "Ajouter un événement" */
        .events-section .btn {
            background-color: #ff4d4d;
            color: white;
            padding: 10px 20px;
            font-size: 1.1rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-bottom: 20px;
            transition: background-color 0.3s ease;
        }

        .events-section .btn:hover {
            background-color: #cc0000;
        }

        /* Conteneur des cartes */
        .cards-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            margin-top: 20px;
        }

        /* Cartes d'événements */
        .card {
            background-color: #222;
            border-radius: 10px;
            padding: 20px;
            width: 300px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease;
        }

        .card:hover {
            transform: translateY(-5px);
        }

        .card h3 {
            color: #ff4d4d;
            font-size: 1.5rem;
            margin-bottom: 10px;
        }

        .card p {
            color: #ccc;
            margin-bottom: 10px;
        }

        .card .btn {
            background-color: #444;
            color: white;
            padding: 10px 15px;
            font-size: 0.9rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .card .btn:hover {
            background-color: #ff4d4d;
        }

        /* Modal pour ajouter un événement */
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.8);
        }

        .modal-content {
            background-color: #333;
            margin: 10% auto;
            padding: 30px;
            border-radius: 10px;
            width: 40%;
            color: white;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        }

        .modal-content h2 {
            color: #ff4d4d;
            margin-bottom: 20px;
        }

        .modal-content input,
        .modal-content textarea {
            width: 100%;
            margin-bottom: 15px;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #444;
            background-color: #222;
            color: white;
        }

        .modal-content button {
            background-color: #ff4d4d;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            color: white;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .modal-content button:hover {
            background-color: #cc0000;
        }

        .close {
            color: white;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }

        .close:hover,
        .close:focus {
            color: #ff4d4d;
            text-decoration: none;
            cursor: pointer;
        }
    </style>
</head>
<body>
<header>
    <nav class="navbar">
        <div class="logo">Exilium Carnage</div>
        <ul class="nav-links">
            <li><a href="index.php">Accueil</a></li>
            <li><a href="members.php">Membres</a></li>
            <li><a href="events.php" class="active">Évènements</a></li>
            <li><a href="contact.php">Contact</a></li>
        </ul>
        <?php
        if (isset($_SESSION['user_name'])) {
            echo '<div class="welcome-message">Bienvenue, ' . htmlspecialchars($_SESSION['user_name']) . '</div>';
            echo '<a href="php/logout.php" class="btn logout">Déconnexion</a>';
        } else {
            echo '<div class="auth-buttons">
                <a href="php/signup.php" class="btn signup">Inscription</a>
                <a href="php/login.php" class="btn login">Connexion</a>
            </div>';
        }
        ?>
    </nav>
</header>

<main>
    <section class="events-section">
        <h1>Événements à venir</h1>
        <button onclick="openModal()" class="btn">Ajouter un événement</button>
        <div class="cards-container">
            <?php if (!empty($events)): ?>
                <?php foreach ($events as $event): ?>
                    <div class="card">
                        <h3><?= htmlspecialchars($event['title']) ?></h3>
                        <p><strong>Date :</strong> <?= htmlspecialchars($event['date']) ?></p>
                        <p><?= htmlspecialchars(substr($event['description'], 0, 100)) ?>...</p>
                        <a href="#" class="btn">En savoir plus</a>
                    </div>
                <?php endforeach; ?>
            <?php else: ?>
                <p>Aucun événement à afficher pour le moment.</p>
            <?php endif; ?>
        </div>
    </section>
</main>

<!-- Modal pour ajouter un événement -->
<div id="eventModal" class="modal">
    <div class="modal-content">
        <span class="close" onclick="closeModal()">&times;</span>
        <h2>Ajouter un événement</h2>
        <form action="events.php" method="POST">
            <input type="hidden" name="add_event" value="1">
            <label for="title">Nom de l'événement :</label>
            <input type="text" id="title" name="title" required>

            <label for="start_date">Date de début :</label>
            <input type="date" id="start_date" name="start_date" required>

            <label for="end_date">Date de fin :</label>
            <input type="date" id="end_date" name="end_date" required>

            <label for="start_time">Heure de début :</label>
            <input type="time" id="start_time" name="start_time" required>

            <label for="end_time">Heure de fin :</label>
            <input type="time" id="end_time" name="end_time" required>

            <label for="prize">Lot à gagner :</label>
            <input type="text" id="prize" name="prize" required>

            <label for="description">Description :</label>
            <textarea id="description" name="description" rows="4" required></textarea>

            <button type="submit">Créer l'événement</button>
        </form>
    </div>
</div>

<script>
    function openModal() {
        document.getElementById('eventModal').style.display = 'block';
    }

    function closeModal() {
        document.getElementById('eventModal').style.display = 'none';
    }

    window.onclick = function (event) {
        const modal = document.getElementById('eventModal');
        if (event.target === modal) {
            closeModal();
        }
    }
</script>
</body>
</html>
