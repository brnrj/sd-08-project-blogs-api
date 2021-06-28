const express = require('express');

const { loginControler } = require('../controllers');

const login = express.Router();

login.post('/', loginControler);

module.exports = login;
