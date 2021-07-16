const express = require('express');
const categoryController = require('../controllers/categoryController');

const categoriesRouter = express.Router();

categoriesRouter.post('/', categoryController.createCategory);
categoriesRouter.get('/', categoryController.getAllCategories);

module.exports = categoriesRouter;
