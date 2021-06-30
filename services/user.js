const { User: UserModel } = require('../models');
const { sequelize } = require('../models');
const UserSchema = require('../schema/user');
const { customError } = require('../utils/index');

const createOne = async (newUser) => {
  const { error } = UserSchema.validate(newUser);

  if (error) return customError(error.details[0].message, 'invalid_data');

  const user = await UserModel.findOne({ where: { email: newUser.email } });

  if (user) return customError('User already registered', 'conflict');

  return sequelize.transaction(async (transaction) => (
    UserModel.create({ ...newUser }, { transaction })
  ));
};

const findAll = async () => UserModel.findAll();

module.exports = {
  createOne,
  findAll,
};
