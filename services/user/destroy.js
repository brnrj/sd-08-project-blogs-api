const boom = require('@hapi/boom');
const { sequelize } = require('../../models');
const findById = require('./findById');

module.exports = async (userId) => {
  const user = await findById(userId);

  if (!user) throw boom.badRequest('User not found');

  return sequelize.transaction(async (transaction) => user.destroy({ transaction }));
};
