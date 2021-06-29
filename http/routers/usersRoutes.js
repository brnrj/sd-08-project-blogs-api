const { celebrate, Segments, Joi } = require('celebrate');
const express = require('express');
const { usersController } = require('../../controllers');
const auth = require('../middlewares/isAuthenticated');

const routes = express.Router();
routes.get('/', auth, usersController.usersAll);

routes.post('/', celebrate({
  [Segments.BODY]: {
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
    image: Joi.string(),
  }, 
}), usersController.createUser);

routes.get('/:id', auth, usersController.userById);
routes.delete('/me', auth, usersController.excludeUser);

module.exports = routes;
