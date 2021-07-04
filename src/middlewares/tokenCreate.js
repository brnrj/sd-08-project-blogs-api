const jwt = require('jsonwebtoken');

const secret = 'secretjwt';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

function TokenCreate(req, res, next) {
  const data = req.body;
  const token = jwt.sign(data, secret, jwtConfig);
  req.token = token;
  next();
}

module.exports = TokenCreate;