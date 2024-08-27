const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const playerController = require('./controllers/playerController.js');

const connection = mysql.createPool({
  host: 'db',
  user: 'root',
  password: 'r00t',
  database: 'ddb',
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
playerController.initialize(connection);

app.get('/admin/player/:id',playerController.getPlayers);

module.exports = app;