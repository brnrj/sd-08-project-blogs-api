const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../helpers/statusHttp');

const { JWT_SECRET } = process.env;

const jwtMalformed = {
  status: UNAUTHORIZED,
  message: 'jwt malformed',
};

const missingAuthToken = {
  status: UNAUTHORIZED,
  message: 'missing auth token',
};

const auth = rescue((req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) return next({ err: missingAuthToken });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const {
      data: { id, role, userEmail },
    } = decoded;
    req.email = userEmail;
    req.userId = id;
    req.role = role;
  } catch (e) {
    next({ err: jwtMalformed });
  }
  next();
});

module.exports = auth;
