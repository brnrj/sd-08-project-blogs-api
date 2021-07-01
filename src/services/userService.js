const { Users } = require('../models');
const { genToken } = require('../helper/validateJWT');

const addUser = async (displayName, email, password, image) => {
  const data = await Users.create({ displayName, email, password, image });
  const { password: userPassword, ...objData } = data.toJSON();
  const token = genToken(objData);
  return token;
};

const userLogin = async (email, password) => {
  const data = await Users.findOne({ where: { email, password } });
  const token = genToken(data);
  return token;
};

const getAllUsers = async () => Users.findAll();

module.exports = {
  addUser,
  userLogin,
  getAllUsers,
};