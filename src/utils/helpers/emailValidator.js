const validator = require('validator');
const { MissingParamError, EmptyParamError, InvalidEmailError } = require('../errors');

const emailValidator = (email) => {
  if (email === undefined) throw new MissingParamError('email');
  if (email.length === 0) throw new EmptyParamError('email');
  if (!validator.isEmail(email)) throw new InvalidEmailError('email');
};

module.exports = emailValidator;