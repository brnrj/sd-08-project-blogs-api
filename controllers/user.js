const { Router } = require('express');

const UserController = Router();

const { User } = require('../models');
const { tokenCreate, validata, auth } = require('../services');

const STATUS_409 = 409;
const STATUS_201 = 201;
// const STATUS_401 = 401;
const STATUS_404 = 404;
const STATUS_200 = 200;

// create 
UserController.post('/', validata, tokenCreate, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const token = req.userToken;
  const existUser = await User.findOne({ where: { email } });
  if (existUser) return res.status(STATUS_409).json({ message: 'User already registered' });
  await User.create({ displayName, email, password, image });
  return res.status(201).json({ token });
});

// findAll
UserController.get('/', auth, async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } }); 
  return res.status(STATUS_201).json([users]);
});

// findOne
UserController.get('/:id', auth, async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  // const user = await User.findOne({ attributes: { exclude: ['password'] } });
  if (!user) return res.status(STATUS_404).json({ message: 'User does not exist' });
  return res.status(STATUS_200).json(user);
});

// update //destroy //find com Op
// const deleteUser = async (req, res) => {
  
// };

module.exports = UserController;
