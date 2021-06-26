const express = require('express');

const userController = require('../controllers');

const user = express.Router();

user.post('/user', userController.createUser);

module.exports = user;
