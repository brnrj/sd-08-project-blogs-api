const missingPassword = (password) => {
  if (!password) throw new Error('"password" is required$400');
};

const passwordLength = (password) => {
  if (password.length < 6) throw new Error('"password" length must be 6 characters long$400');
};

module.exports = {
  missingPassword,
  passwordLength,
};
