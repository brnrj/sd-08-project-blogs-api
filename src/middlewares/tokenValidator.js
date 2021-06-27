const jwt = require('jsonwebtoken');
const { httpStatusCode } = require('../../constants');
const CustomErr = require('../utils');

const secret = process.env.JWT_SECRET;

const malFormedToken = new CustomErr(httpStatusCode.UNAUTHORIZED, 'Expired or invalid token');

const tokenValidator = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) throw new CustomErr(httpStatusCode.UNAUTHORIZED, 'Token not found');
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
  } catch (error) {
    return next(malFormedToken);
  }
  next();
};

module.exports = tokenValidator;
