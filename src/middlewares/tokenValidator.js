const jwt = require('jsonwebtoken');
const { httpStatusCode } = require('../../constants');

const secret = 'E5teEm3uSu73rP@ssU0rd1';

const tokenValidator = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) throw new Error('missing auth token');
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
  } catch (error) {
    return next({
      message: 'jwt malformed',
      status: httpStatusCode.UNAUTHORIZED,
    });
  }
  return next();
};

module.exports = tokenValidator;
