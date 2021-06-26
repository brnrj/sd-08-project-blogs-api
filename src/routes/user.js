const express = require('express');

const { userControler } = require('../controllers');

const user = express.Router();

user.use('/', userControler.createUser);

module.exports = user;
