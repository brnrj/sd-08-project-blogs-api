const joi = require('@hapi/joi');

const signUp = joi.object({
  displayName: joi.string().min(8).required(),
  email: joi.string().email().required(),
  password: joi.string()
    .length(6).message('"password" length must be 6 characters long')
    .required(),
  image: joi.string(),
});

const signIn = joi.object({
  email: joi.string().email().required(),
  password: joi.string().length(6).required(),
});

const category = joi.object({
  name: joi.string().required(),
});

const post = joi.object({
  userId: joi.number().required(),
  title: joi.string().required(),
  content: joi.string().required(),
  categoryIds: joi.array().items(joi.number()).required(),
});

const updatePost = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
});

module.exports = { signUp, signIn, category, post, updatePost };
