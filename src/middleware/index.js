const error = require('./error');
const validateNewUser = require('./validateNewUser');
const validationLogin = require('./validateLogin');
const validateToken = require('./validateToken');
const validateCategories = require('./validateCategories');
const validateBlogPost = require('./validateBlogPost');

module.exports = {
    error,
    validateNewUser,
    validationLogin,
    validateToken,
    validateCategories,
    validateBlogPost,
};