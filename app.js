const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3003;

// Set up MySQL connection
const db = mysql.createConnection({
  host: '159.138.172.192',
  user: 'sammy',
  password: '#Password123',
  database: 'Hilary',
  port: '3306',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

// Registration form
app.route('/register')
  .get((req, res) => {
    res.render('register');
  })
  .post((req, res) => {
    const { Name, Email, Age } = req.body;
    const sql = 'INSERT INTO users (Name, Email, Age) VALUES (?, ?, ?)';
    db.query(sql, [Name, Email, Age], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        throw err;
      }
      console.log('User registered');
      res.redirect('/');
    });
  });

// Login form
app.route('/login')
  .get((req, res) => {
    res.render('login');
  })
  .post((req, res) => {
    const { Name, Email, Age } = req.body;
    const sql = 'SELECT * FROM users WHERE Name = ? AND Email = ? AND Age =?';
    db.query(sql, [Name, Email, Age], (err, result) => {
      if (err) {
        console.error('Error during login:', err);
        throw err;
      }
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
