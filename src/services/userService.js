const { Users } = require('../models');
const { genToken } = require('../helper/validateJWT');

const addUser = async (displayName, email, password, image) => {
  await Users.create({ displayName, email, password, image });
  const token = await genToken(displayName, email, password, image);
  return token;
};

const userLogin = async (email, password) => {
  await Users.findOne({ where: { email, password } });
  const token = await genToken(email);
  return token;
};

module.exports = {
  addUser,
  userLogin,
};