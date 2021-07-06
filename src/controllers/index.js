const user = require('./userController');
const login = require('./loginController');
const Categories = require('./categoriesController');
const blogPost = require('./blogPostController');

module.exports = {
  user,
  login,
  Categories,
  blogPost,
};