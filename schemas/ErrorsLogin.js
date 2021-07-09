const Joi = require('joi');

const httpRequestError = 400;

const userSchema = (body) => Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': '"email" is not allowed to be empty',
    'any.required': '"email" is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': '"password" is not allowed to be empty',
    'any.required': '"password" is required',
  }),
}).validate(body);

const validateUser = (req, res, next) => {
  const { error } = userSchema(req.body);
  if (error) res.status(httpRequestError).json({ message: error.message });
  next();
};

module.exports = validateUser;
