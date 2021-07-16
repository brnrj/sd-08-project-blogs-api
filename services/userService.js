require('dotenv').config();
const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { created, ok } = require('../helpers/statusCode');
const userSchema = require('../schemas/userSchema');

const { JWT_SECRET } = process.env;

const userWithoutPassword = (user) => {
  const { password, ...userData } = user.dataValues;
  return userData;
};

const usersWithoutPassword = (users) => users.map(userWithoutPassword);

const insertUser = async (data) => {
  const incompleteData = userSchema.incompleteData(data);
  if (incompleteData) return incompleteData;

  const invalidData = await userSchema.invalidUserCreation(data);
  if (invalidData) return invalidData;

  const { dataValues } = await User.create(data);
  const { password, ...payload } = dataValues;
  const token = jwt.sign(payload, JWT_SECRET);

  return { status: created, response: { token } };
};

const findAllUsers = async (token) => {
  const unauthorizedToken = userSchema.unauthorizedToken(token);
  if (unauthorizedToken) return unauthorizedToken;

  const allUsers = await User.findAll();
  const users = usersWithoutPassword(allUsers);
  return { status: ok, response: users };
};

const findUserById = async (token, id) => {
  const unauthorizedToken = userSchema.unauthorizedToken(token);
  if (unauthorizedToken) return unauthorizedToken;

  const user = await User.findByPk(id);
  const invalidUser = userSchema.invalidUser(user);
  if (invalidUser) return invalidUser;

  const userData = userWithoutPassword(user);
  return { status: ok, response: userData };
};

module.exports = {
  insertUser,
  findAllUsers,
  findUserById,
};