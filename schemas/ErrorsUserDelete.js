const jwt = require('jsonwebtoken');

const httpResErr = 401;

const validateUser = (req, res, next) => {
  const JwtSecret = 'secret';
  const token = req.headers.authorization;

  if (!token) { res.status(httpResErr).json({ message: 'Token not found' }); return; }
 
  try {
    const decoded = jwt.verify(token, JwtSecret);
    if (!decoded) return res.status(httpResErr).json({ message: 'Expired or invalid token' });
    req.user = decoded;
  } catch (error) {
    return res.status(httpResErr).json({ message: 'Expired or invalid token' });
  }

  next();
};

module.exports = validateUser;