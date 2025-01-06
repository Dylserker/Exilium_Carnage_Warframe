<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupération des données du formulaire
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Vérification des champs
    if (!empty($name) && !empty($email) && !empty($message)) {
        // Envoi d'un email (configuration simplifiée)
        $to = "contact@exiliumcarnage.com"; // Remplacez par votre adresse email
        $subject = "Nouveau message de contact";
        $body = "Nom : $name\nEmail : $email\nMessage :\n$message";
        $headers = "From: $email";

        if (mail($to, $subject, $body, $headers)) {
            $successMessage = "Votre message a été envoyé avec succès !";
        } else {
            $errorMessage = "Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer.";
        }
    } else {
        $errorMessage = "Tous les champs sont obligatoires.";
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact - Exilium Carnage</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<header>
    <nav class="navbar">
        <div class="logo">Exilium Carnage</div>
        <ul class="nav-links">
            <li><a href="index.php">Accueil</a></li>
            <li><a href="members.php">Membres</a></li>
            <li><a href="events.php">Évènements</a></li>
            <li><a href="contact.php" class="active">Contact</a></li>
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
    <section class="contact-section">
        <div class="card">
            <h1>Contactez-nous</h1>
            <?php if (isset($successMessage)): ?>
                <p class="success-message"><?= $successMessage ?></p>
            <?php elseif (isset($errorMessage)): ?>
                <p class="error-message"><?= $errorMessage ?></p>
            <?php endif; ?>
            <form action="contact.php" method="POST" class="contact-form">
                <div class="form-group">
                    <label for="name">Nom</label>
                    <input type="text" id="name" name="name" placeholder="Votre nom" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Votre email" required>
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" name="message" rows="5" placeholder="Votre message" required></textarea>
                </div>
                <button type="submit" class="btn submit-btn">Envoyer</button>
            </form>
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
                <li><a href="contact.php">Contact</a></li>
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
