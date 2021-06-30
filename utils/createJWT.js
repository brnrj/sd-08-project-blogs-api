require('dotenv/config');
const jwt = require('jsonwebtoken');

const createJWT = (data) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const { password, ...user } = data;

  const token = jwt.sign({ data: user }, process.env.JWT_SECRET, jwtConfig);

  return token;
};

module.exports = createJWT;