const Joi = require('joi');

const {
  DISPLAY_NAME_TOO_SHORT, INVALID_EMAIL, PASSWORD_TOO_SHORT, MISSING_PASSWORD, MISSING_EMAIL,
} = require('../common/constants/statusMessages');

const MINIMUM_NAME_LENGTH = 8;
const MINIMUM_PASSWORD_LENGTH = 6;

const userValidation = Joi.object({
  displayName: Joi
    .string()
    .min(MINIMUM_NAME_LENGTH)
    .messages({
      'string.base': DISPLAY_NAME_TOO_SHORT,
      'string.min': DISPLAY_NAME_TOO_SHORT,
      'any.required': DISPLAY_NAME_TOO_SHORT,
    })
    .required(),

  email: Joi
    .string()
    .email()
    .messages({
      'string.base': INVALID_EMAIL,
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
