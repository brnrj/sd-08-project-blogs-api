const express = require('express');
const usersController = require('../controllers/usersController');

const usersRoute = express.Router();
const loginRoute = express.Router();

usersRoute.post('/', usersController.createUser);
loginRoute.post('/', usersController.loginUser);

module.exports = { 
  usersRoute,
  loginRoute,
};
