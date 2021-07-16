const express = require('express');
const categoryController = require('../controllers/categoryController');

const categoriesRouter = express.Router();

categoriesRouter.post('/', categoryController.createCategory);

module.exports = categoriesRouter;