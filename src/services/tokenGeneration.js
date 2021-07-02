const jwt = require('jsonwebtoken');
const config = require('../config/config');

const { secret } = config.development;

module.exports = (userData) => {
  const jwtConfig = {
    expiresIn: '3h',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: userData }, secret, jwtConfig);

  return token;
};
