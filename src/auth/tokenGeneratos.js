const jwt = require('jsonwebtoken');

const secret = 'E5teEm3uSu73rP@ssU0rd1';

const headers = {
  algorithm: 'HS256',
  expiresIn: '3d',
};

const tokenGenerete = (payload) => {
  const token = jwt.sign(payload, secret, headers);
  return token;
};

module.exports = tokenGenerete;
