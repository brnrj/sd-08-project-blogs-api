const validate = require('./validate');
const getToken = require('./getToken');
const validateLogin = require('./validateLogin');
const validateCategorie = require('./validateCategorie');
const validatePosts = require('./validatePosts');
const validateCategoryIds = require('./validateCategoryIds');
const validatePostUpdate = require('./validatePostUpdate');

module.exports = {
  validate,
  getToken,
  validateLogin,
  validateCategorie,
  validatePosts,
  validateCategoryIds,
  validatePostUpdate,
};
