const { Router } = require('express');
const { createCategory } = require('../controllers/categories');
const { validateToken } = require('../middlewares/tokenValidateMiddleware');

const categoryRoute = Router();

categoryRoute.route('/categories')
  .post(validateToken, createCategory);
  
module.exports = categoryRoute;
