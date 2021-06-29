const registerMiddlewares = require('./validateUserRegister');
const blogPostMiddlewares = require('./validateBlogPost');

module.exports = {
  registerMiddlewares,
  blogPostMiddlewares,
};
