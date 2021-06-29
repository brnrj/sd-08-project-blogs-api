const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const UNAUTHORIZED_STATUS = 401;

const error = {
  status: UNAUTHORIZED_STATUS,
  message: 'Expired or invalid token',
};

const JWT = {
  status: UNAUTHORIZED_STATUS,
  message: 'Token not found',
};

const auth = rescue((req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next({ err: JWT });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const {
      data: { email },
    } = decoded;
    
    req.email = email;
  } catch (e) {
    next({ err: error });
  }
  next();
});

module.exports = auth;