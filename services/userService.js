const boom = require('@hapi/boom');

const { User } = require('../models');
const schema = require('../utils/schemaValidation');

const findUserByEmail = async (userData) => {
  const { error } = schema.signIn.validate(userData);

  if (error) return { error };

  const user = await User.findOne({ where: { email: userData.email } });

  if (!user || userData.password !== user.password) {
    return { error: boom.badRequest('Invalid fields') };
  }

  return user;
};

const createUser = async (newUser) => {
  const { error } = schema.signUp.validate(newUser);

  if (error) return { error };

  const { email, password } = newUser;
  const isEmailUsed = await findUserByEmail({ email, password });

  if (isEmailUsed && !isEmailUsed.error) return { error: boom.conflict('User already registered') };

  const user = await User.create(newUser);

  return user;
};

const findAllUsers = async () => {
  const users = User.findAll();

  return users;
};

const findUserById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) return { error: boom.notFound('User does not exist') };

  return user;
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });

  return {};
};

module.exports = { createUser, findUserByEmail, findAllUsers, findUserById, deleteUser };