require('dotenv/config');

const jwt = require('jsonwebtoken');
const { code } = require('../utils/messages');

const validateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  try {
    if (!token) {
      res.status(code.UNAUTHORIZED).json({ message: 'Token not found' });
    }
    console.log(process.env.JWT_SECRET);
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifyToken;
    next();
  } catch (error) {
    return res.status(code.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateJWT; 