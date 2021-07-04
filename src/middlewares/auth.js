const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = 'secretjwt';

// const jwtConfig = {
//   expiresIn: '7d',
//   algorithm: 'HS256'
// };

const STATUS_401 = 401;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(STATUS_401).json({ message: 'Token not found' });
  }

  try {
    jwt.verify(token, secret, async (err, decoded) => {
      if (err) return res.status(STATUS_401).json({ message: 'Expired or invalid token' });
      const { email } = decoded;
      const user = await User.findOne({ where: { email } });

      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(STATUS_401).json({ message: err.message });
  }
};
