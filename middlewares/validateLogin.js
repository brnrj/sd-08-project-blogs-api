const Joi = require('joi');

module.exports = (req, _res, next) => {
  const { email, password } = req.body;

  const requiredNonEmptyString = Joi.string().not().empty().required();
  const minLengthPasswordString = 6;

  const { error } = Joi.object({
    email: requiredNonEmptyString.email(),
    password: requiredNonEmptyString.length(minLengthPasswordString),
  }).validate({ email, password });

  if (error) return next(error);

  return next();
};
