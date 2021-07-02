const validateLength = (displayName) => {
  if (displayName.length < 8) {
    throw new Error('"displayName" length must be at least 8 characters long$400');
  }
};

const missingEmail = (email) => {
  if (email === undefined) throw new Error('"email" is required$400');
};

const validateFormat = (email) => {
  const regex = /\S+@\S+\.\S+/;
  if (!regex.test(email)) throw new Error('"email" must be a valid email$400');
};

const emptyEmail = (email) => {
  if (email.length === 0) throw new Error('"email" is not allowed to be empty$400');
};

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
  validateLength,
  missingEmail,
  validateFormat,
  emptyEmail,
  missingPassword,
  passwordLength,
  emptyPassword,
};