const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');  // Added path module
const app = express();
const port = 3000;

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'AguOkonkwo1-2024',
  database: 'mydatabase',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Set up EJS as the view engine
app.set('views', path.join(__dirname, 'views')); // Set correct path to 'views' directory
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

// Registration form
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, password], (err, result) => {
    if (err) throw err;
    console.log('User registered');
    res.redirect('/');
  });
});

// Login form
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      console.log('Login successful');
      res.redirect('/');
    } else {
      console.log('Login failed');
      res.redirect('/login');
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

