const { EMAIL_REGEX } = require('../../utils/dictionary');

const emailValidation = (email) => EMAIL_REGEX.test(email);

module.exports = emailValidation;