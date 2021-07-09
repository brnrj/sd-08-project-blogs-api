const { InvalidName } = require('../errors');

const nameValidator = (name) => {
  if (!name || name.length < 8) throw new InvalidName('displayName');
};

module.exports = nameValidator;