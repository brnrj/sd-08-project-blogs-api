const boom = require('@hapi/boom');
const { User } = require('../../database/models');
const UserSchema = require('../../schema/user');

module.exports = async (newUser) => {
  const { error } = UserSchema.validate(newUser);

  if (error) throw error;

  const user = await User.findOne({ where: { email: newUser.email } });

  if (user) throw boom.conflict('User already registered');

  return User.create({ ...newUser });
};
