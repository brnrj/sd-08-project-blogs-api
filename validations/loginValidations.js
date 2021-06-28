const joi = require('joi');
const ErrorMessages = require('../messages/errorMessages');
const StatusCode = require('../messages/statusCodeMessages');
const CustomError = require('../error/customError');
const { User } = require('../models');

// https://joi.dev/api/?v=17.4.0
const validateSchemaLogin = joi.object({
  email: joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'br'] } })
    .required(),

  password: joi.string().length(6).required(),
});

const validateLogin = (login) => {
  const { email, password } = login;
  const { error } = validateSchemaLogin.validate({ email, password });

  if (error) {
    const { details: [{ message }] } = error;
    throw new CustomError(
      message,
      StatusCode.BAD_REQUEST,
    );
  }
};

const validateUserExists = async (login) => {
  const { email, password: passwordIn } = login;

  const userFound = await User.findOne({ where: { email } });

  if (!userFound || userFound.password !== passwordIn) {
    throw new CustomError(
      ErrorMessages.invalidFields,
      StatusCode.BAD_REQUEST,
    );
  }

  return userFound;
};

module.exports = {
  validateLogin,
  validateUserExists,
};
