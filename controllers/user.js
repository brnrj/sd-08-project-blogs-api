const { Router } = require('express');
const valEmail = require('../middlewares/validateEmail');
const valPw = require('../middlewares/validatePassword');
const valToken = require('../middlewares/validateToken');
const valUser = require('../middlewares/validateUser');

const userController = Router();
const user = require('../services/user');

userController.post('/', valUser, valEmail, valPw, user.post);
userController.get('/', valToken, user.getAll);

module.exports = userController;
