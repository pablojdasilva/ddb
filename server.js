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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
