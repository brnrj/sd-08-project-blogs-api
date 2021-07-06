const { auth } = require('./auth');
const { tokenCreate } = require('./token');
const { validata } = require('./validata');
const { validLogin } = require('./login');
const { validBlogPost } = require('./blogPost');

module.exports = {
  auth,
  tokenCreate,
  validata,
  validLogin,
  validBlogPost,
};
