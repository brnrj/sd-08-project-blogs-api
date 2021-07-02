const { createNewUser, searchAllUsers } = require('./UserServices');
const loggedIn = require('./LoginServices');

module.exports = { createNewUser, searchAllUsers, loggedIn };
