const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('URL Shortener API Running');
});

module.exports = app;
