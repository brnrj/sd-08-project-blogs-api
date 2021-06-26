const express = require('express');

const { userControler } = require('../controllers');

const user = express.Router();

user.post('/user', userControler.createUser);

module.exports = user;
