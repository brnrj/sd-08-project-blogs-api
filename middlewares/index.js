const { generalError } = require('./error');
const { generateToken, validationToken } = require('./auth');

module.exports = {
  generalError,
  generateToken,
  validationToken,
};
