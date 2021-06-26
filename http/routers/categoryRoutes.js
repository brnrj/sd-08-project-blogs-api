const { celebrate, Segments, Joi } = require('celebrate');
const express = require('express');
const { categoriesController } = require('../../controllers');
const auth = require('../middlewares/isAuthenticated');

const routes = express.Router();

routes.post('/', auth, celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
  } }), categoriesController.registerCategory);

routes.get('/', auth, categoriesController.categoriesAll);
routes.get('/:id', auth, categoriesController.categoryById);

module.exports = routes;