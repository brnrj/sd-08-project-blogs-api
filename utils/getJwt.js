const jwt = require('jsonwebtoken');

const getJwt = (payload) => {
  const jwtConfig = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, process.env.JWT_SECRET, jwtConfig);
};

module.exports = getJwt;
