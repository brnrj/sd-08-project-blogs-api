const jwt = require('jsonwebtoken');
const secret = require('../utils/secret');

const ValidateTokenMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  try {
    const decoded = jwt.verify(authorization, secret);
    req.userInfo = decoded;
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  next();
};

module.exports = ValidateTokenMiddleware;