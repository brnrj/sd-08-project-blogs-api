const express = require('express');

const app = express();

const { createUser, getUsers, getUserById } = require('../controllers/user');

const { validateDisplayName,
    validateEmail,
    validatePassword,    
    } = require('../helpers/helpers');

    const validateJWT = require('../helpers/validateJWT');

app.post('/', validateDisplayName, validateEmail, validatePassword, createUser);
app.get('/', validateJWT, getUsers);
app.get('/:id', validateJWT, getUserById);

module.exports = app;