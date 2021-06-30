const express = require('express');

const routerTest = express.Router();

routerTest.get('/', (req, res) => {
  res.send('Teste0');
});

routerTest.get('/test1', (req, res) => {
  res.send('Teste1');
});

module.exports = routerTest;
