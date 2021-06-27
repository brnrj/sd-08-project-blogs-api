const errorMessage = require('../../../errors/badRequest');

const passwordValidate = (password) => {
  if (password === undefined) return errorMessage('"password" is required');

  if (password === '') return errorMessage('"password" is not allowed to be empty');

  if (password.length < 6) return errorMessage('"password" length must be 6 characters long');

  return true;
};

module.exports = passwordValidate;
