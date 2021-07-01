const jwt = require('jsonwebtoken');

require('dotenv').config();

const secret = process.env.JWT_SECRET || 'minhasenha';

const UNAUTHORIZED = 401;

const errors = {
  tokenNotFound: 'Token not found',
  expiredToken: 'Expired or invalid token',
};

const authUser = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: errors.tokenNotFound });
  }
  try {
    const verifyToken = jwt.verify(token, secret);
    console.log(verifyToken);
    req.user = verifyToken;
    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ message: errors.expiredToken });
  }
};

module.exports = {
  authUser,
};