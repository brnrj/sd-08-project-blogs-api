const jwt = require('jsonwebtoken');
require('dotenv').config();

const validate = async (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload.data;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validate;
