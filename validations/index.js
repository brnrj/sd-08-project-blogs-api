const validateUser = require('./users');
const validateToken = require('./token');
const validateCategory = require('./categories');
const validatePost = require('./posts');

module.exports = {
  validateUser,
  validateToken,
  validateCategory,
  validatePost,
};
