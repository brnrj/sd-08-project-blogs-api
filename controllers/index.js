const { createUser } = require('./createUser');
const { login } = require('./login');
const { getUsers } = require('./getUsers');
const { getUserById } = require('./getUserById');
const { createPost } = require('./createPost');
const { getCategories } = require('./getCategories');
const { createCategory } = require('./createCategory');

module.exports = {
  createUser, login, getUsers, getUserById, createPost, getCategories, createCategory,
};
