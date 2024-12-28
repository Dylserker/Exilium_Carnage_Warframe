<?php
require 'includes/database.php';

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