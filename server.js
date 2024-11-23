const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = 3000;

// Crear conexión con MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Usa tu usuario de MySQL si no es 'root'
    password: '',  // Usa tu contraseña de MySQL
    database: 'bdFinal'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos bdFinal');
    }
});

// Middleware
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Ruta raíz para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para insertar anécdotas
app.post('/insertar', (req, res) => {
    const { anio, anecdota } = req.body;

    const query = 'INSERT INTO tiempo (anio, `anecdota que contar`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `anecdota que contar` = ?';
    db.query(query, [anio, anecdota, anecdota], (err, result) => {
        if (err) {
            console.error('Error al insertar datos:', err);
            res.status(500).send('Error al guardar los datos');
        } else {
            res.send('Anécdota guardada correctamente');
        }
    });
});

// Ruta para obtener experiencias
app.get('/experiencias', (req, res) => {
    const query = 'SELECT * FROM tiempo';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener experiencias:', err);
            res.status(500).send('Error al obtener las experiencias');
        } else {
            res.json(results);
        }
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
