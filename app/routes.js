const express = require('express');
const usersController = require('../controllers/usersController');
const verifyAuthorization = require('../middlewares/verifyAuthorization');

const usersRoute = express.Router();
const loginRoute = express.Router();

usersRoute.post('/', usersController.createUser);
usersRoute.get('/', verifyAuthorization, usersController.getAllUsers);

// loginRoute.use(verifyAuthorization);
loginRoute.post('/', usersController.loginUser);

module.exports = { 
  usersRoute,
  loginRoute,
};
