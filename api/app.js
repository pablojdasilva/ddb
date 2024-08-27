const express = require('express');
const mysql = require('mysql2');
const app = express();

const db = mysql.createPool({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'test',
});


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;