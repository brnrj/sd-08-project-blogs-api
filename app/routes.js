const express = require('express');
const usersController = require('../controllers/usersController');
const categoriesController = require('../controllers/categoriesController');
const verifyAuthorization = require('../middlewares/verifyAuthorization');

const usersRoute = express.Router();
const loginRoute = express.Router();
const categoriesRoute = express.Router();

usersRoute.post('/', usersController.createUser);
usersRoute.get('/', verifyAuthorization, usersController.getAllUsers);
usersRoute.get('/:id', verifyAuthorization, usersController.getUserByID);

// loginRoute.use(verifyAuthorization);
loginRoute.post('/', usersController.loginUser);

categoriesRoute.post('/', verifyAuthorization, categoriesController.createCategory);
categoriesRoute.get('/', verifyAuthorization, categoriesController.getAllCategories);

module.exports = { 
  usersRoute,
  loginRoute,
  categoriesRoute,
};
