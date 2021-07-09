const routes = require('express').Router();
const CategoriesController = require('../controllers/Categories');

routes.post('/categories', CategoriesController.create);

module.exports = routes;