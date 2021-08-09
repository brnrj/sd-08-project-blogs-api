const { User } = require('../models');
const { getToken, decodeToken } = require('../middleware');

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

async function getUsers() {
  const data = await User.findAll();
  return data;
}

async function getUserById(id) {
  const data = await User.findByPk(id);
  if (!data) throw new Error('User does not exist');
  return data;
}

async function deleteUser(token) {
  const { data: { id } } = decodeToken(token);
  await User.destroy({ where: { id } });
  return true;
}

module.exports = {
  createUser, findUser, getUsers, getUserById, deleteUser,
};