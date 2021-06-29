const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('../../models');
const { generateToken } = require('./jwt');

const app = express();
app.use(bodyParser.json());

// 1 - Crie um endpoint para o cadastro de usuários
const addUser = async (req, res, next) => {
    const { body } = req;
    const { password, ...remainingbody } = body;
    await User.create(body);
    const token = generateToken({ ...remainingbody });
    req.token = token;
    next();
};

// 3 - Sua aplicação deve ter o endpoint GET /user

const findAllUsers = async (req, res, next) => {
  const allUsers = await User.findAll();
  req.allUsers = allUsers;
  next();
};

module.exports = {
  addUser,
  findAllUsers,
};