<?php
$host = 'localhost';
$db   = 'notepad_db'; // Ganti dengan nama database Anda
$user = 'root'; // Username XAMPP default
$pass = ''; // Password XAMPP default (biasanya kosong)

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
?>
