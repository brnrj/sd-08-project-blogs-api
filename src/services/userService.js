const { Users } = require('../models');
const { genToken } = require('../helper/validateJWT');

const addUser = async (displayName, email, password, image) => {
  await Users.create({ displayName, email, password, image });
  const token = await genToken(displayName, email, password, image);
  return token;
};

module.exports = {
  addUser,
};