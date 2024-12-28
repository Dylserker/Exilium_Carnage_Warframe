<?php
// Connexion à la base de données
require 'includes/database.php';

try {
    // Récupérer les événements depuis la base de données
    $stmt = $pdo->query("SELECT title, date, description FROM events ORDER BY date DESC");
    $events = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    $events = [];
    error_log("Erreur lors de la récupération des événements : " . $e->getMessage());
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Événements - Exilium Carnage</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<header>
    <nav class="navbar">
        <div class="logo">Exilium Carnage</div>
        <ul class="nav-links">
            <li><a href="index.php">Accueil</a></li>
            <li><a href="members.php">Membres</a></li>
            <li><a href="events.php" class="active">Évènements</a></li>
            <li><a href="index.php">Contact</a></li>
        </ul>
        <?php
        session_start();
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

<footer class="footer">
    <div class="footer-container">
        <div class="footer-menu">
            <h3>Menu</h3>
            <ul>
                <li><a href="index.php">Accueil</a></li>
                <li><a href="members.php">Membres</a></li>
                <li><a href="events.php">Évènements</a></li>
                <li><a href="index.php">Contact</a></li>
            </ul>
        </div>
        <div class="footer-social">
            <h3>Suivez-nous</h3>
            <ul>
                <li><a href="https://www.facebook.com" target="_blank">Facebook</a></li>
                <li><a href="https://www.twitter.com" target="_blank">Twitter</a></li>
                <li><a href="https://www.instagram.com" target="_blank">Instagram</a></li>
                <li><a href="https://www.discord.com" target="_blank">Discord</a></li>
            </ul>
        </div>
        <div class="footer-contact">
            <h3>Contact</h3>
            <p>Email : <a href="mailto:contact@exiliumcarnage.com">contact@exiliumcarnage.com</a></p>
        </div>
    </div>
    <div class="footer-bottom">
        <p>&copy; 2024 Exilium Carnage. Tous droits réservés.</p>
    </div>
</footer>
</body>
</html>
