const MissingParamError = require('./MissingParamError');
const EmptyParamError = require('./EmptyParamError');
const InvalidNameError = require('./InvalidNameError');
const InvalidEmailError = require('./InvalidEmailError');
const InvalidPasswordError = require('./InvalidPasswordError');
const InvalidFieldsError = require('./InvalidFieldsError');
const UserAlreadyExistsError = require('./UserAlreadyExistsError');
const TokenNotFoundError = require('./TokenNotFoundError');
const InvalidTokenError = require('./InvalidTokenError');

module.exports = {
  MissingParamError,
  EmptyParamError,
  InvalidNameError,
  InvalidEmailError,
  InvalidPasswordError,
  InvalidFieldsError,
  UserAlreadyExistsError,
  TokenNotFoundError,
  InvalidTokenError,
};