<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->id)) {
    $stmt = $pdo->prepare("DELETE FROM notes WHERE id = ?");
    $stmt->execute([$data->id]);
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
