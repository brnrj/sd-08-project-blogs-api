const { createNewUser, searchAllUsers, searchUserById } = require('./UserServices');
const loggedIn = require('./LoginServices');

module.exports = { createNewUser, searchAllUsers, searchUserById, loggedIn };
