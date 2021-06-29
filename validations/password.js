const missingPassword = (password) => {
  if (password === undefined) throw new Error('"password" is required$400');
};

const passwordLength = (password) => {
  if (password.length < 6) throw new Error('"password" length must be 6 characters long$400');
};

const emptyPassword = (password) => {
  if (password.length === 0) throw new Error('"password" is not allowed to be empty$400');
};

module.exports = {
  missingPassword,
  passwordLength,
  emptyPassword,
};
