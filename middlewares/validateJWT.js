const jwt = require('jsonwebtoken');

const { Users } = require('../models');

const jwtSecret = process.env.JWT_SECRET;

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) next({ status: 401, message: 'Token not found' });
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await Users.findOne({ where: { email: decoded.data } });
    req.user = { id: user.id, email: user.email };
    return next();
  } catch (e) {
    return next({ status: 401, message: 'Expired or invalid token' });
  }
};

module.exports = validateJWT;