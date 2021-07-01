require('dotenv/config');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const tokenValidation = async (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne(decoded.data.email);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = tokenValidation;