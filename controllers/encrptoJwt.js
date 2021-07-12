const jwt = require('jsonwebtoken');

const secret = 'mlbbEshow';

const jwtHeader = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const tokenCreate = (user) => {
  const { displayName, email } = user;
  
  const token = jwt.sign({ data: { displayName, email } }, secret, jwtHeader);
  return token;
};

module.exports = tokenCreate;
