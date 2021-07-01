const jwt = require('jsonwebtoken');

require('dotenv').config();

const secret = process.env.JWT_SECRET || 'minhasenha';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const genToken = (data) => {
  const token = jwt.sign({ data }, secret, jwtConfig);
  return token;
};

module.exports = {
  genToken,
};