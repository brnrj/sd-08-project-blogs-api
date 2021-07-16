const validate = require('./validate');
const getToken = require('./getToken');
const validateLogin = require('./validateLogin');
const validateCategorie = require('./validateCategorie');
const validatePosts = require('./validatePosts');
const validateCategoryIds = require('./validateCategoryIds');

module.exports = {
  validate,
  getToken,
  validateLogin,
  validateCategorie,
  validatePosts,
  validateCategoryIds,
};
