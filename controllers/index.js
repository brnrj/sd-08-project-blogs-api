const { createUser } = require('./createUser');
const { login } = require('./login');
const { getUsers } = require('./getUsers');
const { getUserById } = require('./getUserById');
const { createPost } = require('./createPost');
const { getCategories } = require('./getCategories');
const { createCategory } = require('./createCategory');
const { getPosts } = require('./getAllPosts');

module.exports = {
  createUser, login, getUsers, getUserById, createPost, getCategories, createCategory, getPosts,
};
