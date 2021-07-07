const express = require('express');

const app = express();

const { createUser } = require('../controllers/user');

const { validateDisplayName,
    validateEmail,
    validatePassword,    
    } = require('../helpers/helpers');

app.post('/', validateDisplayName, validateEmail, validatePassword, createUser);

module.exports = app;