const { Router } = require('express');
const { createCategory, getAllCategories } = require('../controllers/categories');
const { validateToken } = require('../middlewares/tokenValidateMiddleware');

const categoryRoute = Router();

categoryRoute.route('/categories')
  .post(validateToken, createCategory)
  .get(validateToken, getAllCategories);
  
module.exports = categoryRoute;
