<?php
if (isset($_GET['signup'])) {
    if ($_GET['signup'] === 'success') {
        echo "<p class='success-message'>Inscription réussie !</p>";
    } elseif ($_GET['signup'] === 'error') {
        $message = htmlspecialchars($_GET['message']);
        if ($message === 'email_taken') {
            echo "<p class='error-message'>Cet email est déjà utilisé.</p>";
        } elseif ($message === 'server_error') {
            echo "<p class='error-message'>Une erreur est survenue. Veuillez réessayer.</p>";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exilium Carnage</title>
    <link rel="stylesheet" href="style.css">
</head>
<?php
require 'includes/database.php';
try {
    $stmt = $pdo->query("SELECT first_name, last_name FROM users");
    $members = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    $members = [];
    error_log("Erreur lors de la récupération des membres : " . $e->getMessage());
}
?>
<body>
<header>
    <nav class="navbar">
        <div class="logo">Exilium Carnage</div>
        <ul class="nav-links">
            <li><a href="index.php">Accueil</a></li>
            <li><a href="members.php">Membres</a></li>
            <li><a href="events.php">Evènements</a></li>
            <li><a href="contact.php">Contactes</a></li>
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
    <section class="hero-banner">
        <div class="hero-content">
            <h1>Exilium Carnage</h1>
            <p>Bienvenue dans notre clan, unis pour conquérir l'univers de Warframe avec passion et stratégie.</p>
        </div>
    </section>
    <section class="bcs">
        <section class="members-section">
            <h2>Membres importants</h2>
            <div class="cards-container">
                <div class="card">
                    <img src="img/Operator.jpg" alt="Membre 1">
                    <h3>Dylserker</h3>
                    <p>Hérault du Chaos: (Main Ash Prime) Le coeur sur la main prêt à aider ses membres tout dans la rigolade.</p>
                </div>
                <div class="card">
                    <img src="https://via.placeholder.com/150" alt="Membre 2">
                    <h3>Cluz13</h3>
                    <p>Main d'Exilium: (Main Nyx Prime) La force tranquille avec un côté chill et bienvaillant.</p>
                </div>
            </div>
        </section>
        <section class="about-us">
            <div class="about-content">
                <h2>Qui sommes-nous ?</h2>
                <p>
                    Exilium Carnage est un clan uni, fondé sur l'entraide, la bienveillance et la passion du jeu.
                    Ensemble, nous progressons, affrontons les défis et célébrons chaque victoire.
                    Rejoignez-nous pour vivre une aventure unique dans la communauté Warframe.
                </p>
            </div>
        </section>
    </section>

    <!-- Formulaire d'inscription (modale) -->
    <div id="signup-modal" class="modal hidden">
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>Inscription</h2>
            <form action="#" method="POST" class="signup-form">
                <label for="first-name">Prénom</label>
                <input type="text" id="first-name" name="first-name" placeholder="Votre prénom" required>

                <label for="last-name">Nom</label>
                <input type="text" id="last-name" name="last-name" placeholder="Votre nom" required>

                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Votre email" required>

                <label for="password">Mot de passe</label>
                <input type="password" id="password" name="password" placeholder="Votre mot de passe" required>

                <label for="confirm-password">Confirmez le mot de passe</label>
                <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirmez le mot de passe" required>

                <button type="submit" class="btn submit-btn">S'inscrire</button>
            </form>
        </div>
    </div>
    <div id="login-modal" class="modal hidden">
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>Connexion</h2>
            <form action="php/login.php" method="POST" class="login-form">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Votre email" required>

                <label for="password">Mot de passe</label>
                <input type="password" id="password" name="password" placeholder="Votre mot de passe" required>

                <button type="submit" class="btn submit-btn">Se connecter</button>
            </form>
        </div>
    </div>
    <footer class="footer">
        <div class="footer-container">
            <!-- Menu -->
            <div class="footer-menu">
                <h3>Menu</h3>
                <ul>
                    <li><a href="index.php">Accueil</a></li>
                    <li><a href="members.php">Membres</a></li>
                    <li><a href="events.php">Evènements</a></li>
                    <li><a href="contact.php">Contact</a></li>
                </ul>
            </div>
            <!-- Réseaux Sociaux -->
            <div class="footer-social">
                <h3>Suivez-nous</h3>
                <ul>
                    <li><a href="https://www.facebook.com" target="_blank">Facebook</a></li>
                    <li><a href="https://www.twitter.com" target="_blank">Twitter</a></li>
                    <li><a href="https://www.instagram.com" target="_blank">Instagram</a></li>
                    <li><a href="https://www.discord.com" target="_blank">Discord</a></li>
                </ul>
            </div>
            <!-- Contact -->
            <div class="footer-contact">
                <h3>Contact</h3>
                <p>Email : <a href="mailto:contact@exiliumcarnage.com">contact@exiliumcarnage.com</a></p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 Exilium Carnage. Tous droits réservés.</p>
        </div>
    </footer>
    <script src="script.js"></script>
</body>
</html>