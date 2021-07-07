const jwt = require('jsonwebtoken');

const secret = 'onepiece';

module.exports = (req, _res, next) => {
  const { email } = req.body;
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: email }, secret, jwtConfig);
  req.token = token;
  next();
};
