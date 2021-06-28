const emailValidation = (email) => {
  if (email === '') return '"email" is not allowed to be empty';
  if (!email) return '"email" is required';
  return false;
};

const passwordValidation = (password) => {
  if (password === '') return '"password" is not allowed to be empty';
  if (!password) return '"password" is required';
  return false;
};

module.exports = {
  emailValidation,
  passwordValidation,
};