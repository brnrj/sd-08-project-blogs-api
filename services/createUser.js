const { User } = require('../models');
const { getToken } = require('../middleware');

async function createUser(body) {
  const { email } = body;
  const data = await User.findOne({ where: { email } });
  if (data) throw new Error('User already registered');
  await User.create(body);
  return { token: getToken(data) };
}

async function findUser(email) {
  const data = await User.findOne({ where: { email } });
  return !!data;
}

module.exports = {
  createUser, findUser,
};