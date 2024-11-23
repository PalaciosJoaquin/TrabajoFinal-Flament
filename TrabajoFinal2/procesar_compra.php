<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "camisetas";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

$dni = $data['dni'];
$nombre = $data['nombre'];
$camiseta = $data['camiseta'];
$cantidad = $data['cantidad'];
$deuda = $data['deuda'];

$sql = "INSERT INTO compras (dni, nombre, camiseta, cantidad, deuda) VALUES ('$dni', '$nombre', '$camiseta', '$cantidad', '$deuda')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Compra registrada correctamente"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}

$conn->close();
?>
