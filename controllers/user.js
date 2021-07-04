const { Router } = require('express');

const UserController = Router();

const { User } = require('../models');

// create 
UserController.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const user = await User.create({ displayName, email, password, image });   
  res.status(200).json(user);
});

// findAll
UserController.get('/', async (req, res) => {
  const users = await UserController.findAll();
  res.status(200).json(users);
});

// findByPK
// const getByIdUser = async (req, res) => {
  
// };

// update //destroy //find com Op
// const deleteUser = async (req, res) => {
  
// };

module.exports = UserController;
