const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ConjuntosDB',
    port: 3306
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conexión a la base de datos establecida');
});

app.get('/conjuntos', (req, res) => {
    db.query('SELECT * FROM ConjuntosHabitacionales', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/conjunto/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM ConjuntosHabitacionales WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

app.post('/conjunto', (req, res) => {
    const data = req.body;
    db.query('INSERT INTO ConjuntosHabitacionales SET ?', data, (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId });
    });
});

app.get('/departamentos/:conjuntoId', (req, res) => {
    const conjuntoId = req.params.conjuntoId;
    db.query('SELECT * FROM Departamentos WHERE conjuntoHabitacionalId = ?', [conjuntoId], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.post('/departamento', (req, res) => {
    const data = req.body;
    db.query('INSERT INTO Departamentos SET ?', data, (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId });
    });
});

app.delete('/conjunto/:id', (req, res) => {
    const conjuntoId = req.params.id;

    // Primero eliminamos los departamentos relacionados
    db.query('DELETE FROM Departamentos WHERE conjuntoHabitacionalId = ?', [conjuntoId], (err, result) => {
        if (err) throw err;

        // Luego eliminamos el conjunto habitacional
        db.query('DELETE FROM ConjuntosHabitacionales WHERE id = ?', [conjuntoId], (err, result) => {
            if (err) throw err;
            res.json({ message: 'Conjunto y departamentos eliminados correctamente' });
        });
    });
});


app.delete('/departamento/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM Departamentos WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Departamento eliminado con éxito' });
    });
});

app.listen(port, () => {
    console.log(`API corriendo en http://localhost:${port}`);
});
