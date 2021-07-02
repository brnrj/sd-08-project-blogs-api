const { createNewUser, searchAllUsers, searchUserById } = require('./UserServices');
const loggedIn = require('./LoginServices');
const { createNewCategory } = require('./CategoryServices');

module.exports = {
  createNewUser,
  searchAllUsers,
  searchUserById,
  loggedIn,
  createNewCategory,
};
