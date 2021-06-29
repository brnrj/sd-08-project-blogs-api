const jwt = require('jsonwebtoken');
// const userModel = require('../models/usersMod');
const statusCode = require('../utils/statuscode');
const secret = require('../utils/secretJWT');

const validJWT = (req, res, next) => {
  const token = req.headers.authorization;
  // console.log('token', token);

  if (!token) {
    return res.status(statusCode.code.c401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    // console.log('decoded', decoded);
    
    req.email = decoded.data.email;

    next();
  } catch (err) {
    return res.status(statusCode.code.c401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  validJWT,
};
