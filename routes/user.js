const express = require('express');

const user = express.Router();

const userController = require('../controllers/user');
const jwtVerify = require('../middlewares/jwtVeryfy');

user.post('/', userController.createUser);
user.get('/', jwtVerify, userController.getAllUsers);

module.exports = user;