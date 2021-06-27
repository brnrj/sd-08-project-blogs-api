const express = require('express');

const { userControler } = require('../controllers');
const { tokenValidator } = require('../middlewares');

const user = express.Router();

user.post('/', userControler.createUser);
user.get('/', tokenValidator, userControler.getAllUsers);
user.get('/:id', tokenValidator, userControler.getUserById);

module.exports = user;
