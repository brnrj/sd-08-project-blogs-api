const joi = require('joi');

const msg1 = '"title" is required';
const msg2 = '"content" is required';
const msg3 = '"categoryIds" is required';

const validBlogPost = joi.object({
  title: joi
    .string()
    .messages({ 
      'any.required': msg1,
    })
    .required(),
  content: joi
    .string()
    .messages({ 
      'any.required': msg2,
    })
    .required(),
  categoryIds: joi
    .array()
    .messages({ 
      'any.required': msg3,
    })
    .required(),
  userId: joi
    .number(),
});

module.exports = validBlogPost;
