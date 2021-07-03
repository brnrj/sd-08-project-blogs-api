const rescue = require('express-rescue');
const joi = require('joi');
const boom = require('@hapi/boom');

const getToken = require('../utils/token');
const { User } = require('../models');

const OK = 200;

const loginSchema = joi.object({
  email: joi
    .string()
    .required(),
  password: joi
    .string()
    .required(),
})
  .messages({
    'any.required': '{#label} is required',
  });

module.exports = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const err = { statusCode: 400, isJoi: true, ...error };
    next(err);
  }

  const user = await User.findOne({ where: { email, password } });
  if (!user) throw boom.badRequest('Invalid fields');

  const { id } = user;
  console.log(user);
  const token = getToken({ id, email });

  res.status(OK).json({ token });
});