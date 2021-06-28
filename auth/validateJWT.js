const jwt = require('jsonwebtoken');
const { status, message } = require('../schema/status');
// const { User } = require('../models');

require('dotenv/config');

const SECRET = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const getToken = async (email) => {
  const token = jwt.sign({ data: email }, SECRET, jwtConfig);
  return token;
};

const validationToken = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
  if (!token) return res.status(status.unauthorized).json({ message: message.tokenNotFound });
  const verifyToken = jwt.verify(token, SECRET);
  req.user = verifyToken;
  next();
  } catch (err) {
    return res.status(status.unauthorized).json({ message: message.invalidToken });
  }
};

module.exports = {
  getToken,
  validationToken,
};
