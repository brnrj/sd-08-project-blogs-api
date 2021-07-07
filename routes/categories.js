const express = require('express');

const app = express();

const { createCategory, getCategories } = require('../controllers/categories');

    const validateJWT = require('../helpers/validateJWT');

app.post('/', validateJWT, createCategory);
app.get('/', validateJWT, getCategories);

module.exports = app;