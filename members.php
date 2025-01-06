<?php
require './includes/database.php';

try {
    $stmt = $pdo->query("SELECT first_name, last_name, email FROM users");
    $members = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    $members = [];
    error_log("Erreur lors de la récupération des membres : " . $e->getMessage());
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  
    <title>Liste des Membres - Exilium Carnage</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<header>
    <nav class="navbar">
        <div class="logo">Exilium Carnage</div>
        <ul class="nav-links">
            <li><a href="index.php">Accueil</a></li>
            <li><a href="members.php">Membres</a></li>
            <li><a href="events.php">Evènements</a></li>
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
    <section class="members-list">
        <h1>Liste des Membres</h1>
        <?php if (!empty($members)): ?>
            <ul>
                <?php foreach ($members as $member): ?>
                    <li>
                        <strong><?php echo htmlspecialchars($member['first_name'] . ' ' . $member['last_name']); ?></strong>
                        - <?php echo htmlspecialchars($member['email']); ?>
                    </li>
                <?php endforeach; ?>
            </ul>
        <?php else: ?>
            <p>Aucun membre enregistré pour le moment.</p>
        <?php endif; ?>
    </section>
</main>
<footer>
    <p>&copy; 2024 Exilium Carnage. Tous droits réservés.</p>
</footer>
</body>
</html>