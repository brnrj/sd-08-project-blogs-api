const joi = require('joi');

const msg1 = '"title" is required';
const msg2 = '"content" is required';

const validEditPost = joi.object({
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
});

module.exports = validEditPost;
