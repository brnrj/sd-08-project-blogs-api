const jwt = require('jsonwebtoken');

const secret = 'mlbbEshow';

const jwtHeader = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const tokenCreate = ({ email }) => {
  const token = jwt.sign({ data: { email } }, secret, jwtHeader);
  return token;
};

module.exports = tokenCreate;
