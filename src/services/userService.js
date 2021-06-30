const { CONFLICT } = require('../../common/constants/statusCodes');
const { ALREADY_REGISTERED } = require('../../common/constants/statusMessages');
const { generateError } = require('../../validations/errors/generateError');
const { User } = require('../../models');
const { createToken } = require('../../validations/token');

const findUserByEmail = async (userEmail) => {
  const foundUser = await User.findOne({ where: { email: userEmail } });
  console.log('FOUND', foundUser);
  return foundUser;
};

const createUser = async (userInfos) => {
  const { email } = userInfos;
  console.log('EMAIL', email);
  const foundUser = await findUserByEmail(email);
  // console.log()
  if (foundUser !== null) {
    return generateError(CONFLICT, ALREADY_REGISTERED);
  }

  await User.create(userInfos);
  return { token: createToken(email) };
};

module.exports = {
  createUser,
  findUserByEmail,
};
