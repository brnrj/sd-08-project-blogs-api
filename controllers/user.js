const { Router } = require('express');

const UserController = Router();

const { User } = require('../models');
const { tokenCreate, validata, auth } = require('../services');

const STATUS_409 = 409;
const STATUS_201 = 201;
const STATUS_401 = 401;

// create 
UserController.post('/', validata, tokenCreate, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const token = req.userToken;
  const existUser = await User.findOne({ where: { email } });
  if (existUser) res.status(STATUS_409).json({ message: 'User already registered' });
  await User.create({ displayName, email, password, image });
  res.status(201).json({ token });
});

// findAll
UserController.get('/', tokenCreate, auth, async (req, res) => {
  const { token } = req.header;
  if (!token) res.status(STATUS_401).json({ message: 'Token not found' });
  const users = await UserController.findAll({ attributes: { exclude: ['password'] } });
  res.status(STATUS_201).json(users);
});

// 
// findByPK
// const getByIdUser = async (req, res) => {
  
// };

// update //destroy //find com Op
// const deleteUser = async (req, res) => {
  
// };

module.exports = UserController;
