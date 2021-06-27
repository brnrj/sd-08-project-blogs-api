const { createUser, findUser, getUsers, getUserById } = require('./user');
const { login } = require('./login');

module.exports = {
  createUser, findUser, login, getUsers, getUserById,
};