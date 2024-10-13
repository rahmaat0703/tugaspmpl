<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->title, $data->content)) {
    $stmt = $pdo->prepare("INSERT INTO notes (title, content) VALUES (?, ?)");
    $stmt->execute([htmlspecialchars($data->title), htmlspecialchars($data->content)]);
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
