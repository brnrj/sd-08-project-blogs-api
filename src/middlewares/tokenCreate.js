const jwt = require('jsonwebtoken');

const secret = 'secretjwt';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

function TokenCreate(req, res, next) {
  const { displayName } = req.body;
  const token = jwt.sign({ displayName }, secret, jwtConfig);
  req.token = token;
  next();
}

module.exports = TokenCreate;