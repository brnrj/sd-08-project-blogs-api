const { User } = require('../models');
const validations = require('../validations/user');
const getToken = require('../helper/getToken');
const decodeToken = require('../helper/decodeToken');

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

const deleteAccount = async (token) => {
  const { data: { id } } = decodeToken(token);

  await User.destroy({ where: { id } });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteAccount,
};