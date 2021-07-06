const Joi = require('joi');

module.exports = (req, _res, next) => {
  const { displayName, email, password, image } = req.body;

  const requiredNonEmptyString = Joi.string().not().empty().required();
  const minLengthNameString = 8;
  const minLengthPasswordString = 6;

  const { error } = Joi.object({
    displayName: requiredNonEmptyString.min(minLengthNameString),
    email: requiredNonEmptyString.email(),
    password: requiredNonEmptyString.length(minLengthPasswordString),
    image: Joi.string(),
  }).validate({ displayName, email, password, image });
  if (error) return next(error);

  return next();
};