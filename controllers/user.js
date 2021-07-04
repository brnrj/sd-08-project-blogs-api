const { Router } = require('express');

const UserController = Router();

const { User } = require('../models');
const { tokenCreate, validata } = require('../services');

const STATUS_409 = 409;

// create 
UserController.post('/', validata, tokenCreate, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const existUser = await User.findOne({ where: { email } });
  if (existUser) res.status(STATUS_409).json({ message: 'User already registered' });
  const user = await User.create({ displayName, email, password, image });
  res.status(201).json(user);
});

// findAll
UserController.get('/', async (req, res) => {
  const users = await UserController.findAll({ attributes: { exclude: ['password'] } });
  res.status(201).json(users);
});

// findByPK
// const getByIdUser = async (req, res) => {
  
// };

// update //destroy //find com Op
// const deleteUser = async (req, res) => {
  
// };

module.exports = UserController;
