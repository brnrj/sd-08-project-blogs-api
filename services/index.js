const { createUser, findUser, getUsers, getUserById } = require('./user');
const { login } = require('./login');
const { createCategory, getCategories } = require('./category');
const { createPost } = require('./post');

module.exports = {
  createUser, findUser, login, getUsers, getUserById, createCategory, getCategories, createPost,
};