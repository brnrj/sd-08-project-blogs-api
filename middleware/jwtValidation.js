require('dotenv').config();

const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

function getToken(user) {
  const token = jwt.sign(({ data: user }), secret, jwtConfig);
  return token;
}

module.exports = {
  getToken,
};