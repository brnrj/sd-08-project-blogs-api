const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const { usersController } = require('../../controllers');

const routes = express.Router();

routes.get('/', usersController.userAll);

routes.post('/user', celebrate({
  [Segments.BODY]: {
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
    image: Joi.string(),
  }, 
}), usersController.createUser);

module.exports = routes;
