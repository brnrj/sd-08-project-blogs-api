require('dotenv').config();

const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const getToken = (user) => jwt.sign(({ data: user }), secret, jwtConfig);
const verifyToken = (token) => jwt.verify(token, secret);
const decodeToken = (token) => jwt.decode(token, secret);
module.exports = {
  getToken, verifyToken, decodeToken,
};