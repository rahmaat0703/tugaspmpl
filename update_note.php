<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->id, $data->title, $data->content)) {
    $stmt = $pdo->prepare("UPDATE notes SET title = ?, content = ? WHERE id = ?");
    $stmt->execute([
        htmlspecialchars($data->title), 
        htmlspecialchars($data->content), 
        $data->id
    ]);
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
