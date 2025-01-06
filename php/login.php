<?php
require '../includes/database.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = htmlspecialchars($_POST['email']);
    $password = $_POST['password'];

    try {
        $stmt = $pdo->prepare("SELECT id, first_name, password FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['first_name'];
            header("Location: ../index.php?login=success");
            exit();
        } else {
            $error_message = "Identifiants incorrects.";
        }
    } catch (PDOException $e) {
        error_log("Erreur lors de la connexion : " . $e->getMessage());
        $error_message = "Une erreur est survenue. Veuillez réessayer.";
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion</title>
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
            padding: 20px 30px;
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
            margin-bottom: 20px;
            color: #ff4d4d;
            font-size: 1.2em;
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

        .error-message {
            color: #ff4d4d;
            margin-bottom: 15px;
            font-size: 1em;
        }
    </style>
</head>
<body>
<div class="form-container">
    <h1>Connexion</h1>
    <?php if (!empty($error_message)): ?>
        <p class="error-message"><?= htmlspecialchars($error_message); ?></p>
    <?php endif; ?>
    <form action="login.php" method="POST">
        <label for="email">Email :</label>
        <input type="email" id="email" name="email" placeholder="Votre email" required>

        <label for="password">Mot de passe :</label>
        <input type="password" id="password" name="password" placeholder="Votre mot de passe" required>

        <button type="submit">Se connecter</button>
    </form>
</div>
</body>
</html>
