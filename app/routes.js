const express = require('express');
const usersController = require('../controllers/usersController');
const categoriesController = require('../controllers/categoriesController');
const postsController = require('../controllers/postsController');
const verifyAuthorization = require('../middlewares/verifyAuthorization');

const usersRoute = express.Router();
const loginRoute = express.Router();
const categoriesRoute = express.Router();
const postRoute = express.Router();

usersRoute.post('/', usersController.createUser);
usersRoute.get('/', verifyAuthorization, usersController.getAllUsers);
usersRoute.get('/:id', verifyAuthorization, usersController.getUserByID);

// loginRoute.use(verifyAuthorization);
loginRoute.post('/', usersController.loginUser);

categoriesRoute.post('/', verifyAuthorization, categoriesController.createCategory);
categoriesRoute.get('/', verifyAuthorization, categoriesController.getAllCategories);

postRoute.post('/', verifyAuthorization, postsController.createPost);
postRoute.get('/', verifyAuthorization, postsController.getAllPosts);
postRoute.get('/:id', verifyAuthorization, postsController.getByIdPost);
postRoute.put('/:id', verifyAuthorization, postsController.editPostById);

module.exports = { 
  usersRoute,
  loginRoute,
  categoriesRoute,
  postRoute,  
};
