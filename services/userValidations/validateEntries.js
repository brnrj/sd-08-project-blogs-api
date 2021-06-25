const validateEmail = require('./validateEmail');
const validateDisplayName = require('./validateDisplayName');
const validatePassword = require('./validatePassword');

const validateEntries = async (displayName, email, password) => {
  const displayNameValid = validateDisplayName(displayName);
  if (displayNameValid.err) return displayNameValid;
  const emailValid = await validateEmail(email);
  if (emailValid.err) return emailValid;
  const passwordValid = validatePassword(password);
  if (passwordValid.err) return passwordValid;
  return {};
};

module.exports = validateEntries;
