const Joi = require('joi');

const { 
  MISSING_TITLE, MISSING_CONTENT, MISSING_CATEGORY_ID,
} = require('../common/constants/statusMessages');

const postValidation = Joi.object({
  title: Joi
    .string()
    .messages({
      'string.base': MISSING_TITLE,
      'any.required': MISSING_TITLE,
    })
    .required(),
  
  content: Joi
    .string()
    .messages({
      'string.base': MISSING_CONTENT,
      'any.required': MISSING_CONTENT,
    })
    .required(),
  
  categoryIds: Joi
  .array()
  .messages({
    'any.required': MISSING_CATEGORY_ID,
  })
  .required(),
});

module.exports = postValidation;
