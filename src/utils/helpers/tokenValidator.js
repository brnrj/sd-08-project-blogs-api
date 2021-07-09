const jwt = require('jsonwebtoken');
const { TokenNotFoundError, InvalidTokenError } = require('../errors');

const tokenValidator = (token) => {
  if (!token) throw new TokenNotFoundError();
  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) throw new InvalidTokenError();
  });
};

module.exports = tokenValidator;