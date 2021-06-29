const boom = require('@hapi/boom');
const { User: UserModel } = require('../../models');

module.exports = async (id) => {
  const result = await UserModel.findOne({ where: { id } });
  if (!result) throw boom.notFound('User does not exist');
  return result;
};
