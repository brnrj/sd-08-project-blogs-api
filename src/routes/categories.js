const routes = require('express').Router();
const CategoriesController = require('../controllers/Categories');

routes.get('/categories', CategoriesController.index);
routes.post('/categories', CategoriesController.create);

module.exports = routes;