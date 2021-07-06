const { Router } = require('express');

// const validateToken = require('../middlewares/validateToken');
// const validatePostCategory = require('../middlewares/validatePostCategory');

// const CategoryController = require('../controllers/CategoryController');

const categoriesRoutes = Router();

categoriesRoutes.post('/', () => 'Post');
categoriesRoutes.get('/', () => 'Get');

module.exports = categoriesRoutes;
