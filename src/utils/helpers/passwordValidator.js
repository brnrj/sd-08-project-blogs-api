const { MissingParamError, EmptyParamError, InvalidPasswordError } = require('../errors');

const passwordValidator = (password) => {
  if (password === undefined) throw new MissingParamError('password');
  if (password.length === 0) throw new EmptyParamError('password');
  if (password.length !== 6) throw new InvalidPasswordError('password');
};

module.exports = passwordValidator;