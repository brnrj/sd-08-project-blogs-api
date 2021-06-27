const errorMessage = require('../../../errors/badRequest');

const displayNameValidate = (displayName) => {
  if (displayName.length < 8) {
    return errorMessage('"displayName" length must be at least 8 characters long');
  }
  return true;
};

module.exports = displayNameValidate;
