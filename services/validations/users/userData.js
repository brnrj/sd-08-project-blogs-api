const displayNameValidate = require('./displayName');
const emailValidate = require('./email');
const passwordValidate = require('./password');

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
