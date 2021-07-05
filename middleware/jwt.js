require('dotenv/config');
const jwt = require('jsonwebtoken');

const httpStatusCodeUnauthorized = 401;

const validatedToken = async (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    return res.status(httpStatusCodeUnauthorized).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.data;
    next();
  } catch (error) {
    res.status(httpStatusCodeUnauthorized).json({ message: 'Invalid token' });
  }
};

module.exports = validatedToken;
