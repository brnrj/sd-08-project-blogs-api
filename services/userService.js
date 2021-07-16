require('dotenv').config();
const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { created, ok } = require('../helpers/statusCode');
const userSchema = require('../schemas/userSchema');

const { JWT_SECRET } = process.env;

const usersWithoutPassword = (users) => users.map((user) => {
  const { password, ...userData } = user.dataValues;
  return userData;
});

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
  const unauthorizedToken = await userSchema.unauthorizedToken(token);
  if (unauthorizedToken) return unauthorizedToken;

  const allUsers = await User.findAll();
  const users = usersWithoutPassword(allUsers);
  return { status: ok, response: users };
};

module.exports = {
  insertUser,
  findAllUsers,
};