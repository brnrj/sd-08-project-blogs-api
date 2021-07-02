const Joi = require('joi');

const badRequest = 400;

/* 
Referência:
https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages
*/
const validateBody = (body) =>
  Joi.object({
    email: Joi
      .string()
      .error(new Error('"email" is not allowed to be empty')),
    password: Joi
      .string()
      .error(new Error('"password" is not allowed to be empty')),
  }).validate(body);

const validateLogin = async (req, res, next) => {
  const { error } = validateBody(req.body);

  if (error) {
    return res.status(badRequest).json({ message: error.message });
  }
  next();
};

module.exports = {
  validateLogin,
};