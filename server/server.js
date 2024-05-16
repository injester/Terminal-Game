const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'terminal'
});

db.connect(err => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + db.threadId);
});

app.post('/addscore', (req, res) => {
    const { username, score } = req.body;
    const query = 'INSERT INTO players (username, score) VALUES (?, ?)';

    db.query(query, [username, score], (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.status(201).json({ id: results.insertId });
    });
});

app.get('/highscores', (req, res) => {
    const query = 'SELECT username, score FROM players ORDER BY score DESC LIMIT 10';

    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.status(200).json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
