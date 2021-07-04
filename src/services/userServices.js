// codigo inspirado no do Douglas Cajueiro https://github.com/tryber/sd-08-project-blogs-api/pull/53/files
require('dotenv').config({ path: './config.env' });
const boom = require('@hapi/boom');
const { User } = require('../../models');

const findUserByEmail = async (userEmail) => {
  const foundUser = await User.findOne({ where: { email: userEmail } });
  console.log('FOUND', foundUser);
  return foundUser;
};

const sCreateUser = async (userInfos) => {
  const { email } = userInfos;
  console.log('EMAIL', email);
  const foundUser = await findUserByEmail(email);
  console.log(foundUser);
  if (foundUser !== null) {
    return boom.conflict(process.env.ALREADY_REGISTERED);
  }

  const created = User.create(userInfos);
  return created;
};

module.exports = {
  sCreateUser,
  findUserByEmail,
};