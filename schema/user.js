const joi = require('joi');

module.exports = joi.object({
  displayName: joi.string().required().min(8),
  email: joi.string().required().email(),
  password: joi.string().required().min(6).message('{#label} length must be 6 characters long'),
  image: joi.string().required(),
});
