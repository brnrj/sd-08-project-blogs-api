const Joi = require('joi');

const insert = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string(),
});
  // .messages({
  //   'any.required': 'The {#label} field is required.',
  //   'string.type': '{#label} needs to be a string',
  // });
const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
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
  login,
};
