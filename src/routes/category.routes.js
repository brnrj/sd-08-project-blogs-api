const { Router } = require('express');

const validateToken = require('../middlewares/validateToken');
const validatePostCategory = require('../middlewares/validatePostCategory');

const CategoryController = require('../controllers/CategoryController');

const categoriesRoutes = Router();

categoriesRoutes.post('/', validateToken, validatePostCategory, CategoryController.createCategory);
categoriesRoutes.get('/', validateToken, CategoryController.getAllCategories);

module.exports = categoriesRoutes;
