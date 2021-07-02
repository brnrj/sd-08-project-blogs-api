const jwt = require('jsonwebtoken');
require('dotenv/config');
const { User } = require('../models/index');

const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const ZERO = 0;

const validateJWT = async (req, resp, next) => {
  const token = req.headers.authorization;

  if (!token) return resp.status(UNAUTHORIZED).json({ message: 'Token not found' });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const { nameBank: displayName, emailBank: email } = decode.data; 

    const user = await User.findOne({ where: { displayName, email } });

    if (user.length === ZERO) { 
     return resp.status(NOT_FOUND)
      .json({ message: 'Usuario não existe' }); 
}

    req.user = user;
  } catch (err) {
    return resp.status(UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
  next();
};

module.exports = {
  validateJWT,
};