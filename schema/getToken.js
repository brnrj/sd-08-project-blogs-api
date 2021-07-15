const jwt = require('jsonwebtoken');

module.exports = (userData) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const secret = 'betrybe';

  return jwt.sign({ data: userData }, secret, jwtConfig);
};
