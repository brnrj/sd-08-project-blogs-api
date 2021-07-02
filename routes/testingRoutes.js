const express = require('express');

const routerTest = express.Router();

routerTest.get('/', (req, res) => {
  res.send('Teste0');
});

module.exports = routerTest;
