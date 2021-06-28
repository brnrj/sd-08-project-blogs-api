const userService = require('./user');
const login = require('./login');
const categoriesService = require('./categories');
const postsService = require('./posts');

module.exports = {
  login,
  userService,
  categoriesService,
  postsService,
};
