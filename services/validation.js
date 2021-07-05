const joi = require('joi');

const userSchema = joi.object({
  displayName: joi.string().min(8),
  email: joi.string().email().required(),
  password: joi.string().length(6).required(),
  image: joi.string(),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().length(6).required(),
});

module.exports = { userSchema, loginSchema };
