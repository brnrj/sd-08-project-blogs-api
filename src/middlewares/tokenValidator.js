const jwt = require('jsonwebtoken');
const { httpStatusCode } = require('../../constants');
const CustomErr = require('../utils');

const secret = process.env.JWT_SECRET;

const tokenValidator = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) throw new CustomErr(httpStatusCode.UNAUTHORIZED, 'Token not found');
    const decoded = jwt.verify(token, secret);
    if (!decoded) throw new CustomErr(httpStatusCode.UNAUTHORIZED, 'Expired or invalid token');
  } catch (error) {
    return next(error);
  }
  next();
};

module.exports = tokenValidator;
