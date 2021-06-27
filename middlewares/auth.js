const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../helpers/statusHttp');

const { JWT_SECRET } = process.env;

const jwtMalformed = {
  status: UNAUTHORIZED,
  message: 'Expired or invalid token',
};

const missingAuthToken = {
  status: UNAUTHORIZED,
  message: 'Token not found',
};

const auth = rescue((req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) return next({ err: missingAuthToken });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const {
      data: { email },
    } = decoded;
    req.email = email;
  } catch (e) {
    next({ err: jwtMalformed });
  }
  next();
});

module.exports = auth;
