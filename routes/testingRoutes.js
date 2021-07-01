const express = require('express');
const { validateUserRegister, verifyRequestCampsExists } = require('../middlewares');
const stringify = require('../utils/stringfy');
const { eMiddleware } = require('../middlewares');

const goodStatus = { CREATED: 201, OK: 200 };
const { CREATED, OK } = goodStatus;
const notLegal = { status: 400 };
const theMessage = { message: '"this message"' };

const { User: UserModel, BlogPosts: BlogPostsModel } = require('../models');

const routerTest = express.Router();
routerTest.use(eMiddleware);

routerTest.get('/', (req, res) => {
  res.send('Teste0');
});

routerTest.post('/test1', async (req, res) => {
  try {
    xablau;
  } catch (e) {
    console.log(e.message);
    res.send(e.message);
  }
});

routerTest.get('/test2', validateUserRegister);

routerTest.get('/getAll', (req, res) => {
  UserModel.findAll({ include: [{ model: BlogPostsModel, as: 'blogposts' }] })
    .then((posts) => res.send({ find: posts }));
});

module.exports = routerTest;
