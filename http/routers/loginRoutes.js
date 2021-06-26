const { celebrate, Segments, Joi } = require('celebrate');
const express = require('express');
const { usersController } = require('../../controllers');

const routes = express.Router();

routes.post('/', celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
  }, 
}), usersController.loginUser);

module.exports = routes;
