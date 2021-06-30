const missingName = (name) => {
  if (!name) {
    throw new Error('"name" is required$400');
  }
};

module.exports = {
  missingName,
};