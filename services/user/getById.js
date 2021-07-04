const boom = require('@hapi/boom');
const { User } = require('../../models');

module.exports = async (userId) => {
  const user = await User.findOne({ where: { id: userId } });

  if (!user) throw boom.notFound('User does not exist');

  return user;
};