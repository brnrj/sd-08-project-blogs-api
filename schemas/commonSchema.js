require('dotenv').config();
const jwt = require('jsonwebtoken');
const statusCode = require('../helpers/statusCode');
const errors = require('../helpers/errors');

const { JWT_SECRET } = process.env;

const result = (status, response) => ({ status, response });

const unauthorizedToken = (token) => {
  const { unauthorized } = statusCode;
  const { noToken, invalidToken } = errors;

  if (!token) return result(unauthorized, noToken);
  
  try {
    jwt.verify(token, JWT_SECRET);
    return null;
  } catch (err) {
    return result(unauthorized, invalidToken);
  }
};

module.exports = {
  unauthorizedToken,
};
