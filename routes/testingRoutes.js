const express = require('express');

const routerTest = express.Router();

routerTest.post('/', (req, res) => {
  res.send('Teste0');
});

module.exports = routerTest;
