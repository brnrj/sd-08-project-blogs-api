const express = require('express');

const category = express.Router();

const categoryControllers = require('../controllers/category');
const jwtVerify = require('../middlewares/jwtVeryfy');

category.post('/', jwtVerify, categoryControllers.createCategory);

module.exports = category;