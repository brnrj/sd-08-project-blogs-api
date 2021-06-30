const express = require('express');

const { User, BlogPosts } = require('../models');

const routerTest = express.Router();

routerTest.get('/', (req, res) => {
  res.send('Teste0');
});

routerTest.get('/test1', (req, res) => {
  res.send('Teste1');
});

routerTest.get('/getAll', (req, res) => {
  User.findAll({ include: [{ model: BlogPosts, as: 'blogposts' }] })
    .then((posts) => res.send({ find: posts }));
});

module.exports = routerTest;
