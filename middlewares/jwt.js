require('dotenv').config();

const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (email) => jwt.sign(({ data: email }), secret, jwtConfig);

const decodedToken = (token) => jwt.verify(token, secret);

module.exports = {
  generateToken,
  decodedToken,
};
