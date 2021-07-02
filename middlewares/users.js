const Joi = require('joi');

const badRequest = 400;

/* 
Referência:
https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages
*/
const validateBody = (body) =>
  Joi.object({
    displayName: Joi
      .string()
      .min(8)
      .error(new Error('"displayName" length must be at least 8 characters long'))
      .required(),
    email: Joi
      .string()
      .email()
      .error(new Error('"email" must be a valid email')),
    password: Joi
      .string()
      .min(6)
      .error(new Error('"password" length must be 6 characters long')),
    image: Joi.string().required(),
  }).validate(body);

const validateNewUser = async (req, res, next) => {
  const { error } = validateBody(req.body);

  if (error) {
    return res.status(badRequest).json({ message: error.message });
  }
  next();
};

module.exports = {
  validateNewUser,
};