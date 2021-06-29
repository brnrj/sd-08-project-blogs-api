const express = require('express');

const user = express.Router();

const userController = require('../controllers/user');
const jwtVerify = require('../middlewares/jwtVeryfy');

user.post('/', userController.createUser);
user.get('/', jwtVerify, userController.getAllUsers);
user.get('/:id', jwtVerify, userController.getUserById);
user.delete('/me', jwtVerify, userController.deleteAccount);

module.exports = user;