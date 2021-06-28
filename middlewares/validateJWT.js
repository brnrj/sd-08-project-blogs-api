const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const validateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) next({ status: 401, message: 'Token not found' });
  try {
    jwt.verify(token, jwtSecret);
    return next();
  } catch (e) {
    return next({ status: 401, message: 'Expired or invalid token' });
  }
};

module.exports = validateJWT;