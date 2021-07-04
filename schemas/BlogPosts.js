const Joi = require('joi');

const insert = Joi.object({
  title: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number()).required(),
  content: Joi.string().required(),
});

const update = Joi.object({
  label1: Joi.string(),
  label2: Joi.string().isoDate().message('Date needs to be on ISODate pattern'),
  label3: Joi.number(),
  label4: Joi.array().items(Joi.number()),
});

module.exports = {
  insert,
  update,
};
