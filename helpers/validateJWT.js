const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const secret = 'secret';

const UNAUTHORIZED = 401;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) return res.status(UNAUTHORIZED).json({ message: 'Token not found' });
    const decoded = jwt.verify(token, secret);
    const user = await Users.findOne({ where: { email: decoded.data.email } });
    if (!user) return res.status(UNAUTHORIZED).json({ message: 'Expired or invalid token' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};
