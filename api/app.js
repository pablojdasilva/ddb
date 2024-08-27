const express = require('express');
const mysql = require('mysql2');
const app = express();
const playerController = require('./controllers/playerController.js');

const db = mysql.createPool({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'test',
});


app.use(express.json());

app.get('/admin/player',playerController.getPlayers);

module.exports = app;