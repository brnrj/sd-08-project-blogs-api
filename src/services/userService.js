const { User } = require('../models');

function getAllUsers() {
  try {
    const allUsers = User.findAll().then((users) => users);
    return allUsers;
  } catch (err) {
    console.log(err);
  }
}

async function createUser(user) {
  try {
    const isCreated = await User.create(user);
    // console.log(isCreated);
    return isCreated;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = { getAllUsers, createUser };
