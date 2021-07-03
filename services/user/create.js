const boom = require('@hapi/boom');

const { User } = require('../../models');
const getToken = require('../../utils/token');

module.exports = async (newUser) => {
  const findEmail = await User.findOne({ where: { email: newUser.email } });
  if (findEmail) throw boom.conflict('User already registered');
  
  const { id, email } = await User.create(newUser);
  const token = getToken({ id, email });
  return { token };
};