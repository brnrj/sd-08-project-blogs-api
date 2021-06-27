const { Router } = require('express');
const valToken = require('../middlewares/validateToken');
const valName = require('../middlewares/validateName');

const categoryController = Router();
const category = require('../services/category');

categoryController.post('/', valName, valToken, category.post);

module.exports = categoryController;
