const express = require('express');
const { categoriesControler } = require('../controllers');

const { tokenValidator } = require('../middlewares');

const categories = express.Router();

categories.post('/', tokenValidator, categoriesControler.createCategory);
categories.get('/', tokenValidator, categoriesControler.getCategory);

module.exports = categories;
