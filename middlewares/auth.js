const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;
const UNAUTHORIZED = 401;

const createToken = (req, _res, next) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: req.body.email }, secret, jwtConfig);
  req.token = token;
  next();
};

const getToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(UNAUTHORIZED).json({ message: 'Token not found' });
    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({ where: { email: decoded.data } });
    if (!user) return res.status(UNAUTHORIZED).json({ message: 'Expired or invalid token' });
    req.userId = user.id;
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  createToken,
  getToken,
};
