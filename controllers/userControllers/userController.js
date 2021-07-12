const express = require('express');
const { Users } = require('../../models');
const { validationCreateUser } = require('./userValidations');
const tokenCreate = require('../encrptoJwt');

const routerUser = express.Router();

routerUser.get('/', async (_req, res) => {
  const findAll = await Users.findAll();
  
  return res.status(200).json(findAll);
});

routerUser.post('/', async (req, res) => {
  const userData = req.body;
  console.log(userData);
  const validation = await validationCreateUser(userData);

  if (validation) {
    const { erro: { mensagem, code } } = validation;
    return res.status(code)
      .json({ message: mensagem });
  }

  const { displayName, email, password } = userData;
  
  await Users.create({ displayName, email, password });
  
  const token = await tokenCreate(userData);
  res.status(201).json({ token });
});

module.exports = routerUser;
