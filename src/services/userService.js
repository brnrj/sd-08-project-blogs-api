const { User } = require('../models');
const { genToken } = require('../helper/validateJWT');

const addUser = async (displayName, email, password, image) => {
  const data = await User.create({ displayName, email, password, image });
  const { password: userPassword, ...objData } = data.toJSON();
  const token = genToken(objData);
  return token;
};

const userLogin = async (email, password) => {
  const data = await User.findOne({ where: { email, password } });
  const token = genToken(data);
  return token;
};

const getAllUsers = async () => User.findAll();

const getUserById = async (id) => {
  const data = await User.findOne({ where: { id } });
  return data;
};

module.exports = {
  addUser,
  userLogin,
  getAllUsers,
  getUserById,
};