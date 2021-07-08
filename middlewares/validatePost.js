const Joi = require('joi');

module.exports = (req, _res, next) => {
  const { title, content, categoryIds } = req.body;

  const requiredString = Joi.string().required();
  const requiredNumber = Joi.number().required();

  const { error } = Joi.object({
    title: requiredString,
    content: requiredString,
    categoryIds: Joi.array().items(requiredNumber).required(),
  }).validate({ title, content, categoryIds });
  if (error) return next(error);

  return next();
};