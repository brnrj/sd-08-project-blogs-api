const Joi = require('joi');

module.exports = (req, _res, next) => {
  const requiredNonEmptyString = Joi.string().not().empty().required();
  const minLengthNameString = 8;
  const minLengthPasswordString = 6;

  const { error } = Joi.object({
    displayName: requiredNonEmptyString.min(minLengthNameString),
    email: requiredNonEmptyString.email(),
    password: requiredNonEmptyString.length(minLengthPasswordString),
    image: Joi.string(),
  }).validate(req.body);
  if (error) return next(error);

  next();
};