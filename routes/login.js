const express = require('express');

const login = express.Router();

const loginControllers = require('../controllers/login');

login.post('/', loginControllers.login);

module.exports = login;