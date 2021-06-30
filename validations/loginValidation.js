const Joi = require('joi');

const {
  INVALID_EMAIL, PASSWORD_TOO_SHORT, MISSING_PASSWORD, MISSING_EMAIL, EMAIL_IS_EMPTY,
} = require('../common/constants/statusMessages');

const MINIMUM_PASSWORD_LENGTH = 6;

const userValidation = Joi.object({
  email: Joi
    .string()
    .email()
    .messages({
      'string.base': EMAIL_IS_EMPTY,
      'string.email': INVALID_EMAIL,
      'any.required': MISSING_EMAIL,
    })
    .required(),
  
  password: Joi
    .string()
    .min(MINIMUM_PASSWORD_LENGTH)
    .messages({
      'string.base': MISSING_PASSWORD,
      'string.min': PASSWORD_TOO_SHORT,
      'any.required': MISSING_PASSWORD,
    })
    .required(),
});

module.exports = userValidation;
