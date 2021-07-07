const { Router } = require('express');

const validateUser = require('../middlewares/validateUser');
const validateUserEmail = require('../middlewares/validateUserEmail');
const validateToken = require('../middlewares/validateToken');

const UserController = require('../controllers/UserController');

const userRoutes = Router();

userRoutes.post('/', validateUserEmail, validateUser, UserController.createUser);
userRoutes.get('/', validateToken, UserController.getAllUsers);
userRoutes.get('/:id', validateToken, UserController.getUserById);
userRoutes.delete('/me', () => 'Delete');

module.exports = userRoutes;