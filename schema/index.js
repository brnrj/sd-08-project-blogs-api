const joi = require('joi');

const LoginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const UserSchema = joi.object({
  displayName: joi.string().required().min(8),
  email: joi.string().required().email(),
  password: joi.string().required().min(6).message('{#label} length must be 6 characters long'),
  image: joi.string().required(),
});

module.exports = {
  UserSchema,
  LoginSchema,
};
