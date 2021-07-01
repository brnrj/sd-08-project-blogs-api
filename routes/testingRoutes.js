const express = require('express');
const { validateUserRegister } = require('../middlewares/UserRelated/checkUserRequest');
const stringify = require('../utils/stringfy');

const notLegal = { status: 400 };
const theMessage = { message: '"this message"' };

const { User, BlogPosts } = require('../models');

const routerTest = express.Router();

routerTest.get('/', (req, res) => {
  res.send('Teste0');
});

routerTest.get('/test1', validateUserRegister, (req, res) => {
  try {
    if (!req.body.displayName) throw new Error(stringify(notLegal, theMessage));
    // res.send({ message: req.body.displayName });
  } catch (error) {
    console.log(error);
    res.send(JSON.parse(error.message));
  }
});

routerTest.get('/test2', validateUserRegister);

routerTest.get('/getAll', (req, res) => {
  User.findAll({ include: [{ model: BlogPosts, as: 'blogposts' }] })
    .then((posts) => res.send({ find: posts }));
});

module.exports = routerTest;
