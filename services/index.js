const { createUser, findUser, getUsers } = require('./user');
const { login } = require('./login');

module.exports = {
  createUser, findUser, login, getUsers,
};