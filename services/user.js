require('dotenv/config');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const {
  nameValidation,
  emailValidation,
  passwordValidation,
} = require('../middlewares/validations');

const userValidation = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const validation = nameValidation(displayName) || emailValidation(email)
    || passwordValidation(password) || false;
  if (validation) return res.status(400).json({ message: validation });
  next();
};

const tokenValidation = async (req, res, next) => {
  const { token } = req.headers.authorization;
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

module.exports = {
  userValidation,
  tokenValidation,
};