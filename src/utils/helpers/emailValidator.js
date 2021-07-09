const validator = require('validator');
const { MissingParamError, InvalidEmail } = require('../errors');

const emailValidator = (email) => {
  if (!email) throw new MissingParamError('email');
  if (!validator.isEmail(email)) throw new InvalidEmail('email');
};

module.exports = emailValidator;