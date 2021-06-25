const jwt = require('jsonwebtoken');
const users = require('../models/users');
const {
  tokenNotFoundError,
  tokenInvalidError,
} = require('../helpers/errorMessages');

const secret = process.env.SECRET;

const AUTHORIZATION = 'authorization';

const tokenValidation = async (req, res, next) => {
  const token = req.headers[AUTHORIZATION];
  try {
    if (!token) {
      return res.status(401)
        .json({ message: tokenNotFoundError });
    }
    const decoded = jwt.verify(token, secret);

    const user = await users.findOne({ where: { email: decoded.data } });

    if (!user) return res.status(401).json({ message: tokenInvalidError });

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).send({ message: tokenInvalidError });
  }
};

module.exports = tokenValidation;
