function validPassword(password) {
  if (!password) return '"password" is required';
  if (password.length < 6) return '"password" length must be 6 characters long';
  return true;
}

module.exports = validPassword;