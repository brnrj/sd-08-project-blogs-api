const express = require('express');
const { validateUserRegister } = require('../middlewares');
const stringify = require('../utils/stringfy');

const goodStatus = { CREATED: 201, OK: 200 };
const { CREATED, OK } = goodStatus;
const notLegal = { status: 400 };
const theMessage = { message: '"this message"' };

const { User: UserModel, BlogPosts: BlogPostsModel } = require('../models');

const routerTest = express.Router();

routerTest.get('/', (req, res) => {
  res.send('Teste0');
});

routerTest.post('/test1', validateUserRegister, async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await UserModel.create({ displayName, email, password, image });
    res.send(CREATED).send(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send('Erro interno');
  }
});

routerTest.get('/test2', validateUserRegister);

routerTest.get('/getAll', (req, res) => {
  UserModel.findAll({ include: [{ model: BlogPostsModel, as: 'blogposts' }] })
    .then((posts) => res.send({ find: posts }));
});

module.exports = routerTest;
