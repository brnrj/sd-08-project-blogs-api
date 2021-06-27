const jwt = require('jsonwebtoken');
// const { User } = require('../models');

require('dotenv/config');

const SECRET = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const getToken = async (user) => {
  const token = jwt.sign(user, SECRET, jwtConfig);
  return token;
};

module.exports = {
  getToken,
};
