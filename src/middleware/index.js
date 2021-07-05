const error = require('./error');
const validateNewUser = require('./validateNewUser');
const validationLogin = require('./validateLogin');
const validateToken = require('./validateToken');
const validateCategories = require('./validateCategories');

module.exports = {
    error,
    validateNewUser,
    validationLogin,
    validateToken,
    validateCategories,
};