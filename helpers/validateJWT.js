const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const secret = 'mypass';
const errorToken = 'Expired or invalid token';

const UNAUTHORIZED = 401;

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await Users.findOne({ where: { email: decoded.data.email } });
    
    if (!user) return res.status(UNAUTHORIZED).json({ message: errorToken });    

    req.user = user;
  
    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ message: errorToken });
  }
};

module.exports = validateJWT;
