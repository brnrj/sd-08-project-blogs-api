require('dotenv').config();
const jwt = require('jsonwebtoken');

const loginSchema = require('../schemas/loginSchema');
const { ok } = require('../helpers/statusCode');

const { JWT_SECRET } = process.env;

const login = async (data) => {
  const incompleteData = loginSchema.incompleteData(data);
  if (incompleteData) return incompleteData;

  const user = await loginSchema.validUser(data);
  if (!user.id) return user;

  const { password: userPassword, ...payload } = user;
  const token = jwt.sign(payload, JWT_SECRET);

  return { status: ok, response: { token } };
};

module.exports = {
  login,
};
