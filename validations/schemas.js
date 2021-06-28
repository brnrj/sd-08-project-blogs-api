/** @format */

const Joi = require('joi');

const createUserValidate = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string()
    .min(6)
    .required()
    .messages({ 'string.min': '"password" length must be 6 characters long' }),
  image: Joi.string(),
});

const loginValidate = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(6).required(),
});

const createCategoryValidate = Joi.object({
  name: Joi.string().required(),
});

const createPostValidate = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array()
    .items(Joi.number().valid('not allowed').forbidden())
    .required(),
});

const editPostValidate = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.custom((value, helpers) => (
      value ? helpers.message('Categories cannot be edited') : value)),
  });

module.exports = {
  createUserValidate,
  createCategoryValidate,
  loginValidate,
  editPostValidate,
  createPostValidate,
};
