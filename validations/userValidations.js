const joi = require('joi');
const ErrorMessages = require('../messages/errorMessages');
const StatusCode = require('../messages/statusCodeMessages');
const CustomError = require('../error/customError');
const { User } = require('../models');

// https://joi.dev/api/?v=17.4.0
const validateSchemaNewUser = joi.object({
  displayName: joi.string().min(8).required(),

  email: joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'br'] } })
    .required(),

  password: joi.string().length(6).required(),
  
  image: joi.string().required(),
});

const validateNewUser = (user) => {
  const { displayName, email, password, image } = user;
  const { error } = validateSchemaNewUser.validate({ displayName, email, password, image });

  if (error) {
    const { details: [{ message }] } = error;
    throw new CustomError(
      message,
      StatusCode.BAD_REQUEST,
    );
  }
};

const validateEmailAlreadyExists = async (email) => {
  const emailFound = await User.findOne({ where: { email } });

  if (emailFound) {
    throw new CustomError(
      ErrorMessages.userEmailAlreadyExists,
      StatusCode.CONFLICT,
    );
  }
};

module.exports = {
  validateNewUser,
  validateEmailAlreadyExists,
};
