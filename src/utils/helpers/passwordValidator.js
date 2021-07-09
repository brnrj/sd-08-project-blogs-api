const { MissingParamError, InvalidPassword } = require('../errors');

const passwordValidator = (password) => {
  if (!password) throw new MissingParamError('password');
  if (password.length !== 6) throw new InvalidPassword('password');
};

module.exports = passwordValidator;