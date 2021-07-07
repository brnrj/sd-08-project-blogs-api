const { Router } = require('express');

const UserController = Router();

const { User } = require('../models');
const { tokenCreate, validata, auth } = require('../services');

const STATUS_409 = 409;
// const STATUS_201 = 201;
// const STATUS_401 = 401;
const STATUS_404 = 404;
const STATUS_200 = 200;

// create 
UserController.post('/', validata, tokenCreate, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const token = req.userToken;
  const existUser = await User.findOne({ where: { email } });
  console.log('controlerUSER', existUser);
  if (existUser) return res.status(STATUS_409).json({ message: 'User already registered' });
  await User.create({ displayName, email, password, image });
  return res.status(201).json({ token });
});

// findAll
UserController.get('/', auth, async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
 // console.log('findAll', users);
  return res.status(STATUS_200).json(users);
});

// findByPk
UserController.get('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  // console.log('finByPk', user);
  if (!user) return res.status(STATUS_404).json({ message: 'User does not exist' });
  return res.status(STATUS_200).json(user);
});

// update //destroy //find com Op
// const deleteUser = async (req, res) => {
  
// };

module.exports = UserController;
