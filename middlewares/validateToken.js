const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const UNAUTHORIZED = 401;
const NO_TOKEN = { message: 'Token not found' };
const INVALID_TOKEN = { message: 'Expired or invalid token' };

const valToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(UNAUTHORIZED).json(NO_TOKEN);
  
    const { email } = jwt.verify(token, secret);
    const userData = await User.findOne({ where: { email } });
  
    if (!userData) return res.status(UNAUTHORIZED).json(INVALID_TOKEN);
    req.email = userData.email;
  } catch (err) {
    return res.status(UNAUTHORIZED).json(INVALID_TOKEN);
  }
  next();
};

module.exports = valToken;
