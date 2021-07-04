require('dotenv').config();
const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');

const { JWT_SECRET } = process.env;

const getToken = (payload) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  return jwt.sign(payload, JWT_SECRET, jwtConfig);
};

const verifyToken = (token) => jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) throw boom.unauthorized('Expired or invalid token');
    return decoded;
  });

module.exports = {
  getToken,
  verifyToken,
};