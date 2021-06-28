const { User } = require('../models');
const { CONFLICT, NOT_FOUND, BAD_REQUEST } = require('../helpers');
const { generateToken } = require('../middlewares');

const errorUserAlreadyExists = { status: CONFLICT, message: 'User already registered' };
const errorLogin = { status: BAD_REQUEST, message: 'Invalid fields' };
const userNotFound = { status: NOT_FOUND, message: 'User does not exist' };

const createUser = async ({ displayName, email, password, image }) => {
  const emailExists = await User.findOne({ where: { email } });
  if (emailExists) throw errorUserAlreadyExists;

  const newUser = await User.create({ displayName, email, password, image });
  const { dataValues: { password: _noPassword, ...userNoPass } } = newUser;
  const token = generateToken(userNoPass);

  return token;
};

const login = async ({ email, password }) => {
  const validLogin = await User.findOne({ where: { email, password } });
  if (!validLogin) throw errorLogin;

  const { dataValues: { password: _noPassword, ...userNoPass } } = validLogin;
  const token = generateToken(userNoPass);

  return token;
};

const getAllUsers = async () => {
  const allUsers = await User.findAll({ attributes: { exclude: ['password'] } });
  return allUsers;
};

const getUserById = async (id) => {
  const getUser = await User
    .findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
  if (!getUser) throw userNotFound; 
  return getUser;
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  createUser,
  login,
  getAllUsers,
  getUserById,
  deleteUser,
};
