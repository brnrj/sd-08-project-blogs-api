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
    return isCreated;
  } catch (err) {
    console.log(err.message);
  }
}

async function getById(id) {
  try {
    const userById = await User.findOne({ where: { id } });
    return userById;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = { getAllUsers, createUser, getById };
