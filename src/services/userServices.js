// codigo inspirado no do Douglas Cajueiro https://github.com/tryber/sd-08-project-blogs-api/pull/53/files
require('dotenv').config({ path: './config.env' });
const boom = require('@hapi/boom');
const { User } = require('../../models');

const findByKey = async (key, value) => {
  try {
    const foundUser = await User.findOne({ where: { [key]: value } }) || null;
    return foundUser;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const CreateUser = async (userInfos) => {
  const { email } = userInfos;
  // console.log('EMAIL', email);
  const foundUser = await findByKey('email', email);
  if (foundUser !== null) {
    return boom.conflict(process.env.ALREADY_REGISTERED);
  }
  const created = User.create(userInfos);
  return created;
};

const findAll = async () => {
  const foundAll = await User.findAll();
  // console.log('FOUND', foundAll);

  return foundAll;
};

module.exports = {
  CreateUser,
  findAll,
  findByKey,
};