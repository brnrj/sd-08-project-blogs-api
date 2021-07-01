const { CONFLICT, NOT_FOUND } = require('../../common/constants/statusCodes');
const { ALREADY_REGISTERED, USER_NOT_FOUND } = require('../../common/constants/statusMessages');
const { generateError } = require('../../validations/errors/generateError');
const { User } = require('../../models');
const { createToken } = require('../../validations/token');

const findUserByEmail = async (userEmail) => {
  const foundUser = await User.findOne({ where: { email: userEmail } });
  return foundUser;
};

const createUser = async (userInfos) => {
  const { email } = userInfos;
  const foundUser = await findUserByEmail(email);
  if (foundUser !== null) {
    return generateError(CONFLICT, ALREADY_REGISTERED);
  }

  await User.create(userInfos);
  return { token: createToken(email) };
};

const getAllUsers = async () => {
  const allUsers = await User.findAll({ attributes: { exclude: ['password'] } });
  return allUsers.map(({ dataValues }) => dataValues);
};

const getUserById = async (userId) => {
  const foundUser = await User.findOne(
    { where: { id: userId },
    attributes: { exclude: ['password'] },
    },
  );
  if (!foundUser) {
    return generateError(NOT_FOUND, USER_NOT_FOUND);
  }
  return foundUser.dataValues;
};

module.exports = {
  createUser,
  findUserByEmail,
  getAllUsers,
  getUserById,
};
