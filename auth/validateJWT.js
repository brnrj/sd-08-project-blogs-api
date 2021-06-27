const jwt = require('jsonwebtoken');

require('dotenv/config');

const SECRET = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const getToken = async (email) => {
  const token = jwt.sign({ data: email }, SECRET, jwtConfig);
  return token;
};

module.exports = {
  getToken,
};
