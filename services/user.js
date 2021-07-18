const { sequelize } = require('../models');
const { User: UserModel } = require('../models');
const { UserSchema } = require('../schema');
const { customError } = require('../utils/index');

const createOne = async (newUser) => {
  const { error } = UserSchema.validate(newUser);

  if (error) return customError(error.details[0].message, 'invalidData');

  const user = await UserModel.findOne({ where: { email: newUser.email } });

  if (user) return customError('User already registered', 'conflict');

  return sequelize.transaction(async (transaction) => (
    UserModel.create({ ...newUser }, { transaction })
  ));
};

const findAll = async (options) => UserModel.findAll(options);

const findById = async (options) => {
  const result = await UserModel.findOne(options);

  if (!result) return customError('User does not exist', 'notFound');

  return result;
};

const deleteById = async (userId) => {
  const user = await UserModel.findByPk(userId);

  if (!user) return customError('User not found', 'notFound');

  return sequelize.transaction(async (transaction) => user.destroy({ transaction }));
};

module.exports = {
  createOne,
  findAll,
  findById,
  deleteById,
};
