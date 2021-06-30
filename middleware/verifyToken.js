const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  jwt.verify(token, secret, (error, decoded) => {
    if (error) return res.status(401).json({ message: 'Expired or invalid token' });

    req.userId = decoded.data.id;
    return next();
  });
};