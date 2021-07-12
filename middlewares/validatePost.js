const Joi = require('joi');

module.exports = (req, _res, next) => {
  const { title, content } = req.body;

  const requiredString = Joi.string().required();

  const { error } = Joi.object({
    title: requiredString,
    content: requiredString,
  }).validate({ title, content });
  if (error) return next(error);

  return next();
};