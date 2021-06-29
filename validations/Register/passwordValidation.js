const { PASSWORD_LENGTH } = require('../../utils/dictionary');

const passwordValidation = (password) => password.length === PASSWORD_LENGTH;

module.exports = passwordValidation;