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
  const usercreated = User.create(user);
  return usercreated;
}

module.exports = { getAllUsers, createUser };