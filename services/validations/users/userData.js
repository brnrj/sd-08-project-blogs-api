const errorMessage = require('../../../errors/badRequest');
const displayNameValidate = require('./displayName');
const emailValidate = require('./email');

const passwordValidate = (password) => {
  if (!password) return errorMessage('"password" is required');
  if (password.length < 6) return errorMessage('"password" length must be 6 characters long');
  return true;
};

const userData = async (displayName, email, password) => {
  const displayNameValid = displayNameValidate(displayName);
  if (displayNameValid.err) return displayNameValid;

  const emailValid = await emailValidate(email);
  if (emailValid.err) return emailValid;
  
  const passwordValid = passwordValidate(password);
  if (passwordValid.err) return passwordValid;
  
  return {};
};

module.exports = userData;
