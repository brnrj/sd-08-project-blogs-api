const validateLength = (displayName) => {
  if (displayName.length < 8) {
    throw new Error('"displayName" length must be at least 8 characters long$400');
  }
};

module.exports = {
  validateLength,
};
