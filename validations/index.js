const validateName = require('./displayName');
const validateEmail = require('./email');
const validatePassword = require('./password');
const validateToken = require('./token');

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateToken,
};
