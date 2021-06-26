const { checkName } = require('./checkDisplayName');
const { checkEmail } = require('./checkEmail');
const { checkPassword } = require('./checkPassword');
const { getToken } = require('./jwtValidation');

module.exports = { 
  checkName, checkEmail, checkPassword, getToken,
};