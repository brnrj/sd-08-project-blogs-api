const joi = require('joi');

const newUserValidate = joi.object({
  displayName: joi.string().min(8).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6)
  .message('{#label} length must be 6 characters long').required(),
});

const loginValidate = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

module.exports = {
  newUserValidate,
  loginValidate,
};
