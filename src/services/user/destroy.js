const boom = require('@hapi/boom');
const findById = require('./findById');

module.exports = async (userId) => {
  const user = await findById(userId);

  if (!user) throw boom.badRequest('User not found');

  return user.destroy();
};
