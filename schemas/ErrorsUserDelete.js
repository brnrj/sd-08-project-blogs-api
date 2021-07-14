const jwt = require('jsonwebtoken');

const httpRequestErr = 401;

const validateUser = async (req, res, next) => {
  const JwtSecret = 'secret';
  const token = req.headers.authorization;

  if (!token) return res.status(httpRequestErr).json({ message: 'Token not found' });

  jwt.verify(token, JwtSecret, async (err) => {
    if (err) return res.status(httpRequestErr).json({ message: 'Expired or invalid token' });
  });

  req.user = jwt.verify(token, JwtSecret);

  next();
};

module.exports = validateUser;