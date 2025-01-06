<?php
require '../includes/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $firstName = htmlspecialchars($_POST['first-name']);
    $lastName = htmlspecialchars($_POST['last-name']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

    try {
        $stmt = $pdo->prepare("INSERT INTO users (first_name, last_name, email, password) VALUES (:first_name, :last_name, :email, :password)");
        $stmt->execute([
            ':first_name' => $firstName,
            ':last_name' => $lastName,
            ':email' => $email,
            ':password' => $password
        ]);
        echo "Inscription réussie !";
    } catch (PDOException $e) {
        if ($e->getCode() === '23000') { // Conflit de clé unique (email déjà utilisé)
            header('Location: index.php?signup=error&message=email_taken');
        } else {
            header('Location: index.php?signup=error&message=server_error');
        }
        exit;
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Inscription</title>
        <link rel="stylesheet" href="../style.css">
        <style>
            body {
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background: url('../img/bgs.png') no-repeat center center fixed;
                background-size: cover;
                font-family: Arial, sans-serif;
            }

            .form-container {
                background-color: rgba(0, 0, 0, 0.8);
                padding: 30px 40px;
                border-radius: 10px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                text-align: center;
                width: 400px;
            }

            .form-container h1 {
                color: #ff4d4d; /* Rouge sombre */
                margin-bottom: 20px;
                font-size: 2em;
            }

            .form-container label {
                display: block;
                margin-bottom: 5px;
                color: #ff4d4d;
                font-size: 1em;
            }

            .form-container input {
                width: 100%;
                padding: 5px;
                margin-bottom: 15px;
                border: 1px solid #333;
                border-radius: 5px;
                background-color: #222;
                color: #fff;
                font-size: 1em;
            }

            .form-container button {
                background-color: #ff4d4d;
                color: #fff;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                font-size: 1.2em;
                cursor: pointer;
            }

            .form-container button:hover {
                background-color: #cc0000;
            }
        </style>
    </head>
    <body>
    <div class="form-container">
        <h1>Inscription</h1>
        <form action="signup.php" method="POST">
            <label for="first-name">Prénom :</label>
            <input type="text" id="first-name" name="first-name" placeholder="Votre prénom" required>

            <label for="last-name">Nom :</label>
            <input type="text" id="last-name" name="last-name" placeholder="Votre nom" required>

            <label for="email">Email :</label>
            <input type="email" id="email" name="email" placeholder="Votre email" required>

            <label for="password">Mot de passe :</label>
            <input type="password" id="password" name="password" placeholder="Votre mot de passe" required>

            <button type="submit">S'inscrire</button>
        </form>
    </div>
    </body>
</html>
