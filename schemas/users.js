const joi = require('joi');

const MIN_DISPLAYNAME = 8;
const MIN_PASSWORD = 6;

module.exports = joi.object({
  displayName: joi
    .string()
    .min(MIN_DISPLAYNAME)
    .message(`{#label} length must be at least ${MIN_DISPLAYNAME} characters long`)
    .required(),
  email: joi
    .string()
    .email()
    .message('{#label} must be a valid email')
    .required(),
  password: joi
    .string()
    .min(MIN_PASSWORD)
    .message(`{#label} length must be ${MIN_PASSWORD} characters long`)
    .required(),
  image: joi
    .string(),
})
  .messages({
    'any.required': '{#label} is required',
  });