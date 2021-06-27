const { createUser, findUser, getUsers, getUserById } = require('./user');
const { login } = require('./login');
const { createCategory } = require('./category');

module.exports = {
  createUser, findUser, login, getUsers, getUserById, createCategory,
};