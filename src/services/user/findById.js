const boom = require('@hapi/boom');
const { User } = require('../../database/models');

module.exports = async (id) => {
  const result = await User.findByPk(id);
  if (!result) throw boom.notFound('User does not exist');
  return result;
};
