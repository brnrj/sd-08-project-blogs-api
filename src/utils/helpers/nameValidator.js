const { InvalidNameError } = require('../errors');

const nameValidator = (name) => {
  if (!name || name.length < 8) throw new InvalidNameError('displayName');
};

module.exports = nameValidator;