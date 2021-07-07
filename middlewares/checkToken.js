const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = 'onepiece';
const tokenError = 401;

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(tokenError).json({ message: 'Token not found' });
    }
    const decoded = jwt.verify(token, secret);
    const response = await User.findOne({ where: { email: decoded.data } });
    if (!response) {
      return res.status(tokenError).json({ message: 'Expired or invalid token' });
    }
    req.userId = response.id;
    next();
  } catch (error) {
    return res.status(tokenError).json({ message: 'Expired or invalid token' });
  }
};
