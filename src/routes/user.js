const express = require('express');

const { userControler } = require('../controllers');
const { tokenValidator } = require('../middlewares');

const user = express.Router();

user.post('/', userControler.createUser);
user.get('/', tokenValidator, userControler.GetAllUsers);

module.exports = user;
