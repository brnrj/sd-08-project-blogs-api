const jwt = require('jsonwebtoken');

const SECRET = 'privatekey';

const jwtConfig = {
  expiresIn: '5h',
  algorithm: 'HS256',
};

function tokenGenerator(user) {
  const payload = {
    id: user.id,
    email: user.email,
  };
  return jwt.sign(payload, SECRET, jwtConfig);
}

function getTokenUser(token) {
  const decode = jwt.verify(token, SECRET);
  return decode;
}

module.exports = {
  tokenGenerator, getTokenUser,
};