const validateEmail = require('./validateEmail');
const validateDisplayName = require('./validateDisplayName');

const BAD_REQUEST_STATUS = 400;

const messageReturn = (message) => ({
  err: {
    status: BAD_REQUEST_STATUS,
    message,
  },
});

const isvalidPassword = (password) => {
  if (!password) return messageReturn('"password" is required');
  if (password.length < 6) return messageReturn('"password" length must be 6 characters long');
  return true;
};

const validateEntries = async (displayName, email, password) => {
  const displayNameValid = validateDisplayName(displayName);
  if (displayNameValid.err) return displayNameValid;
  const emailValid = await validateEmail(email);
  if (emailValid.err) return emailValid;
  const passwordValid = isvalidPassword(password);
  if (passwordValid.err) return passwordValid;
  return {};
};

module.exports = validateEntries;
