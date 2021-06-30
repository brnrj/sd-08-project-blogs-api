const joi = require('joi');

const msg = '"displayName" length must be at least 8 characters long';
const msg1 = '"name" is required';

const validCategories = joi.object({
  name: joi
    .string()
    .messages({ 
      'string.min': msg,
      'any.required': msg1,
    })
    .required(),
});

module.exports = validCategories;
