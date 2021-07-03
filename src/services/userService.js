const { User } = require('../models');

function getAllUsers() {
  try {
    const allUsers = User.findAll().then((users) => users);
    return allUsers;
  } catch (err) {
    console.log(err);
  }
}

function createUser(user) {
  try {
    User.create(user);
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = { getAllUsers, createUser };
