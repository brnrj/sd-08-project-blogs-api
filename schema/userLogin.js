const Joi = require('joi');

const userLogin = Joi.object({
  email: Joi.string()
    .email()
    .min(1)
    .messages({
      'string.min': '"email" is not allowed to be empty',
    })
    .required(),
  password: Joi.string()
    .min(1)
    .messages({
      'string.min': '"password" is not allowed to be empty',
    })
    .required(),
}).messages({
  'any.required': '{#label} is required',
});
module.exports = userLogin;
