const missingEmail = (email) => {
  if (!email) throw new Error('"email" is required$400');
};

const validateFormat = (email) => {
  const regex = /\S+@\S+\.\S+/;
  if (!regex.test(email)) throw new Error('"email" must be a valid email$400');
};

module.exports = {
  missingEmail,
  validateFormat,
};
