const express = require('express');

const loginRoutes = express.Router();
loginRoutes.use(express.json());
const loginUser = require('../controllers/LoginControllers/login');
const { validateLogin } = require('../middlewares');

loginRoutes.post('/', validateLogin, loginUser);

module.exports = loginRoutes;
