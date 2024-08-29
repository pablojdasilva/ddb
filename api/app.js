const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const VotingController = require('./controllers/votingController.js');
const PlayerController = require('./controllers/playerController.js');

const mysqlConnectionPool = mysql.createPool({
  host: 'db',
  user: 'root',
  password: 'r00t',
  database: 'ddb',
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let playerController =  new PlayerController(mysqlConnectionPool);
let votingController = new VotingController(mysqlConnectionPool);

app.get('/admin/player/:id',playerController.getPlayers);
app.get('/api/voting/teams',votingController.getTeams);
app.get('/api/voting/players', votingController.getPlayers);

module.exports = app;