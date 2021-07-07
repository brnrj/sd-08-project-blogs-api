const express = require('express');

const app = express();

const { login } = require('../controllers/user');

const { validateLogin } = require('../helpers/helpers');

app.post('/', validateLogin, login);

module.exports = app;