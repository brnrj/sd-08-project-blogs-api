const jwt = require('jsonwebtoken');

const error = require('./errorMessages');
const { User } = require('../models');

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const SECRET = process.env.JWT_SECRET;

const tryLogin = async ({ email, password }) => {
  const searchUser = await User.findOne({ where: { email, password } });

  const payload = { data: { email } };

  const token = jwt.sign(payload, SECRET, jwtConfig);

  if (searchUser) return { token };

  return error.userNotFound;
};

module.exports = {
  tryLogin,
};