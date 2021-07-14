const express = require('express');
const { Users } = require('../../models');
const { validationCreateUser, findByIdExists } = require('./userValidations');
const tokenCreate = require('../encrptoJwt');
const verifyToken = require('../jwtValidation');

const routerUser = express.Router();

routerUser.get('/', verifyToken, async (_req, res) => {
  const findAll = await Users.findAll();
  
  return res.status(200).json(findAll);
});

routerUser.get('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const findId = await findByIdExists(id);
  
  if (findId) {
    const { erro } = findId;
    return res.status(erro.code).json({ message: erro.message });
  }

  const findByPk = await Users.findByPk(id);
  
  return res.status(200).json(findByPk);
});

routerUser.post('/', async (req, res) => {
  const userData = req.body;

  const validation = await validationCreateUser(userData);

  if (validation) {
    const { erro: { mensagem, code } } = validation;
    return res.status(code)
      .json({ message: mensagem });
  }

  const { displayName, email, password } = userData;
  
  await Users.create({ displayName, email, password });
  
  const token = tokenCreate({ email });

  res.status(201).json({ token });
});

module.exports = routerUser;
