const validateDisplayName = require('./displayName');
const validateEmail = require('./email');
const validatePassword = require('./password');
const validateToken = require('./token');
const validateName = require('./name');

module.exports = {
  validateDisplayName,
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
};
