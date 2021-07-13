const jwt = require('jsonwebtoken');

const secret = 'Klift, Kloft, Still! A porta se abriu!';

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (_err) {
    return null;
  }
};

module.exports = verifyToken;
