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
// 4 - Sua aplicação deve ter o endpoint GET /user/:id
const hideUserPassword = (data) => {
  const { password, ...infoWithoutPass } = data.dataValues;
  return infoWithoutPass;
};

const findUser = async (req, res, next) => {
  const { user } = req;
  const tratedUser = hideUserPassword(user); 
  req.tratedUser = tratedUser;
  next();
};

// 3 - Sua aplicação deve ter o endpoint GET /user

const hideUsersPassword = (data) => {
  const tratedUsers = data.map((user) => {
    const all = user.dataValues;
    const { password, ...infoWithoutPass } = all;
    return infoWithoutPass;
  });
  return tratedUsers;
};

const findAllUsers = async (req, res, next) => {
  const allUsers = await User.findAll();
  const tratedUsers = hideUsersPassword(allUsers); 
  req.tratedUsers = tratedUsers;
  next();
};

module.exports = {
  addUser,
  findAllUsers,
  findUser,
};