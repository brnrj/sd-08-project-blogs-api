const jwt = require('jsonwebtoken');

const secret = 'mlbbEshow';

const jwtHeader = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const tokenCreate = (payload) => {
  const token = jwt.sign(payload, secret, jwtHeader);
  return token;
};

module.exports = tokenCreate;
