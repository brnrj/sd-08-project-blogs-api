const { User } = require('../models');
const validations = require('../validations/user');
const getToken = require('../helper/getToken');

const createUser = async (newUser) => {
  const { email } = newUser;
  validations.newUserVerify(newUser);

  const user = await User.findOne({ where: { email } });

  validations.userExists(user);

  await User.create(newUser);

  const token = getToken(newUser);

  return token;
};

const getAllUsers = () => User.findAll();

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id } });

  validations.userNotExists(user);

  return user;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};