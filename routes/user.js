const express = require('express');

const user = express.Router();

const userController = require('../controllers/user');

user.post('/', userController.createUser);

module.exports = user;