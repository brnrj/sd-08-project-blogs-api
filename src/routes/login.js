const express = require('express');

const { loginControler } = require('../controllers');

const login = express.Router();

login.use('/login', loginControler);

module.exports = login;
