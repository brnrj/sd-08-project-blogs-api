require('dotenv/config');
const jwt = require('jsonwebtoken');

const httpStatusCodeUnauthorized = 401;

const validatedToken = async (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    return res.status(httpStatusCodeUnauthorized).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, 'seusecretdetoken');
    req.user = decoded.data;
    next();
  } catch (error) {
    res.status(httpStatusCodeUnauthorized).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validatedToken;
