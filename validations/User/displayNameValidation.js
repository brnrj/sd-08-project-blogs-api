const { USER_MIN_LENGTH } = require('../../utils/dictionary');

const displayNameValidation = (name) => name.length >= USER_MIN_LENGTH;

module.exports = displayNameValidation;