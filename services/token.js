const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (email) => jwt.sign({ email }, secret, jwtConfig);

module.exports = generateToken;
