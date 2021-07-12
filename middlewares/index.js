const validateUser = require('./validateUser');
const validateCategories = require('./validateCategories');
const validateLogin = require('./validateLogin');
const validatePost = require('./validatePost');
const createToken = require('./createToken');
const auth = require('./auth');
const checkPostAndOwner = require('./checkPostAndOwner');
const error = require('./error');

module.exports = {
  validateUser,
  validateCategories,
  validateLogin,
  validatePost,
  createToken,
  auth,
  checkPostAndOwner,
  error,
};
