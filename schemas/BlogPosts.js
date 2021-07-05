const Joi = require('joi');

const insert = Joi.object({
  title: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number()).required(),
  content: Joi.string().required(),
});

const update = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number()),
});

module.exports = {
  insert,
  update,
};
