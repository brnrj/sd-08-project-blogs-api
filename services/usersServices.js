const { User } = require('../models');
const { getToken } = require('../auth/validateJWT');
const { status, message } = require('../schema/status');

const findUserByEmail = async (email) => {
  const userByEmail = await User.findOne({ where: { email } });
  return userByEmail;
};

const createUser = async (displayName, email, password, image) => {
  if (password.length < 6) {
    return {
      isError: true,
      status: status.badRequest,
      message: message.passwordSize,
    };
  }
  const { dataValues: { id } } = await User.create({ displayName, email, password, image });
  const token = await getToken({ email, id });
  return token;
};

module.exports = {
  findUserByEmail,
  createUser,
};
