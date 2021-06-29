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

module.exports = {
  missingEmail,
  validateFormat,
  emptyEmail,
};
