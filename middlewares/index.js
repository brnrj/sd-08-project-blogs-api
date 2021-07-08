const validateUser = require('./validateUser');
const validateLogin = require('./validateLogin');
const validatePost = require('./validatePost');
const createToken = require('./createToken');
const auth = require('./auth');
const error = require('./error');

module.exports = {
  validateUser,
  validateLogin,
  validatePost,
  createToken,
  auth,
  error,
};
