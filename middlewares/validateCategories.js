const Joi = require('joi');

module.exports = (req, _res, next) => {
  const { categoryIds } = req.body;

  const requiredNumber = Joi.number().required();

  const { error } = Joi.object({
    categoryIds: Joi.array().items(requiredNumber).required(),
  }).validate({ categoryIds });
  if (error) return next(error);

  return next();
};