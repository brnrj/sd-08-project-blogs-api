const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { code } = require('../helpers/messages');
require('dotenv/config');

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      res.status(code.UNAUTHORIZED).json({ message: 'Token not found' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { email: decoded.email } });
    req.user = user;
    console.log(req.user);
    next();
  } catch (error) {
    return res.status(code.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateJWT;