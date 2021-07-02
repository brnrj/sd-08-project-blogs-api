const { createNewUser, searchAllUsers, searchUserById } = require('./UserServices');
const loggedIn = require('./LoginServices');
const { createNewCategory, searchAllCatgs, searchSpecificCatg } = require('./CategoryServices');

module.exports = {
  createNewUser,
  searchAllUsers,
  searchUserById,
  loggedIn,
  createNewCategory,
  searchAllCatgs,
  searchSpecificCatg,
};
