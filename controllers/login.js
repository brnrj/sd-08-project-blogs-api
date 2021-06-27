const { Router } = require('express');
const valEmail = require('../middlewares/validateEmail');
const valPw = require('../middlewares/validatePassword');

const loginController = Router();
const login = require('../services/login');

loginController.post('/', valEmail, valPw, login.post);

module.exports = loginController;
