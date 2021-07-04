const joi = require('joi');

const requiredString = joi.string().required();

module.exports = joi.object({
  displayName: requiredString.min(8),
  email: requiredString.email(),
  password: requiredString
    .min(6)
    .message('{#label} length must be 6 characters long'),
  image: requiredString,
});
