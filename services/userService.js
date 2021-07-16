const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../models');
const { created } = require('../helpers/statusCode');
const userSchema = require('../schemas/userSchema');

const { JWT_SECRET } = process.env;

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

module.exports = {
  insertUser,
};