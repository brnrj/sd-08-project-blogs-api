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

const findAll = async () => UserModel.findAll();

module.exports = {
  createOne,
  findAll,
};
