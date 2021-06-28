const jwt = require('jsonwebtoken');
const {
  tokenNotFound,
  tokenExpiredOrInvalid,
} = require('../messages/errorMessages');
const { UNAUTHORIZED } = require('../messages/statusCodeMessages');
const { User } = require('../models');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: tokenNotFound });
  }
  try {
    const { email } = jwt.verify(token, secret);
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(UNAUTHORIZED).json({ message: tokenExpiredOrInvalid });
    }

    req.user = user;
    next();
  } catch (_err) {
    return res.status(UNAUTHORIZED).json({ message: tokenExpiredOrInvalid });
  }
};

module.exports = { validateJWT };
