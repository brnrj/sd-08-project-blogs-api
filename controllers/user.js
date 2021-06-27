const { Router } = require('express');
const valEmail = require('../middlewares/validateEmail');
const valPw = require('../middlewares/validatePassword');
const valUser = require('../middlewares/validateUser');

const userController = Router();
const user = require('../services/user');

userController.post('/', valUser, valEmail, valPw, user.post);

module.exports = userController;
