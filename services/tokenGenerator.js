const jwt = require('jsonwebtoken');

const tokenGen = (email) => {
  const jwtConfig = {
    expiresIn: 60 * 60 * 5,
    algorithm: 'HS256',
  };

  const secret = process.env.JWT_SECRET;

  const token = jwt.sign({ data: email }, secret, jwtConfig);

  return (token);
};

module.exports = tokenGen;
