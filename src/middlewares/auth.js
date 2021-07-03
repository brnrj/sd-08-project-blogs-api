const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secret = process.env.SECRET;

// const jwtConfig = {
//   expiresIn: '7d',
//   algorithm: 'HS256'
// };

const STATUS_401 = 401;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(STATUS_401).json({ message: 'missing auth token' });
  }

  try {
    jwt.verify(token, secret, async (err, decoded) => {
      if (err) return res.status(STATUS_401).json({ message: 'jwt malformed' });

      const user = await User.findOne({ where: { decoded } });

      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(STATUS_401).json({ message: err.message });
  }
};
