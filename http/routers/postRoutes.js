const { celebrate, Segments, Joi } = require('celebrate');
const express = require('express');
const { postsController } = require('../../controllers');
const { validadeNotCategories } = require('../middlewares/invalidedField');
const auth = require('../middlewares/isAuthenticated');

const routes = express.Router();
routes.get('/', auth, postsController.postsAll);

routes.post('/', auth, celebrate({
  [Segments.BODY]: {
    title: Joi.string().max(500).required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  }, 
}), postsController.postRegister);

routes.put('/:id', auth, validadeNotCategories, celebrate({
  [Segments.BODY]: {
    title: Joi.string().max(500).required(),
    content: Joi.string().required(),
  }, 
}), postsController.postEdit);

routes.delete('/:id', auth, postsController.postExclude);

routes.get('/:id', auth, postsController.postById);

module.exports = routes;