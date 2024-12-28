<?php
require 'includes/database.php'; // Connexion à la base de données
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = htmlspecialchars($_POST['email']);
    $password = $_POST['password'];

    // Vérifier les champs
    if (empty($email) || empty($password)) {
        header("Location: index.php?login=error&message=empty_fields");
        exit();
    }

    // Récupérer l'utilisateur depuis la base de données
    try {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            // Stocker les informations utilisateur dans la session
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['first_name'] . ' ' . $user['last_name'];
            header("Location: index.php?login=success");
            exit();
        } else {
            header("Location: index.php?login=error&message=invalid_credentials");
            exit();
        }
    } catch (PDOException $e) {
        error_log("Erreur lors de la connexion : " . $e->getMessage());
        header("Location: index.php?login=error&message=server_error");
        exit();
    }
}
?>