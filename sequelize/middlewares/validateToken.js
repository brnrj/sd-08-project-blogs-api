const { getTokenUser } = require('../utils/token');

async function validateToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const decode = getTokenUser(token);
    req.token = decode;
    // next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  next();
}

module.exports = validateToken;