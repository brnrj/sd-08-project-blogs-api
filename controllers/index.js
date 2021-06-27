const { createUser } = require('./createUser');
const { login } = require('./login');
const { getUsers } = require('./getUsers');
const { getUserById } = require('./getUserById');

module.exports = {
  createUser, login, getUsers, getUserById,
};
