const jwt = require('jsonwebtoken');

const getJwt = (payload) => {
  const jwtConfig = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, process.env.JWT_SECRET, jwtConfig);
};

module.exports = getJwt;
