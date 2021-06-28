const boom = require('@hapi/boom');
const { User: UserModel } = require('../models');
const UserSchema = require('../schema/user');
const { sequelize } = require('../models');

console.log(sequelize.transaction);

const create = async (newUser) => {
  const { error } = UserSchema.validate(newUser);

  if (error) throw error;

  const user = await UserModel.findOne({ where: { email: newUser.email } });

  if (user) throw boom.conflict('User already registered');

  return sequelize.transaction(async (transaction) => (
    UserModel.create({ ...newUser }, { transaction })));
};

const findAll = async () => UserModel.findAll();

const findById = async (options) => {
  const result = await UserModel.findOne(options);
  if (!result) throw boom.notFound('User does not exist');
  return result;
};

module.exports = {
  create,
  findAll,
  findById,
};
