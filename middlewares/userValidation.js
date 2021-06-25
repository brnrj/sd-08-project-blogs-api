const Joi = require('joi');

const schema = Joi.object({
  displayName: Joi.string().min(8),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string(),
});

const userValidation = (req, _res, next) => {
  const { displayName, email, password, image } = req.body;
  const { error } = schema.validate({ displayName, email, password, image });
  if (error) return next(error);
  return next();
};

module.exports = userValidation;