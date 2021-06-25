const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const {
  tokenNotFoundError,
  tokenInvalidError,
} = require('../helpers/errorMessages');

const secret = process.env.JWT_SECRET;

const AUTHORIZATION = 'authorization';

const tokenValidation = async (req, res, next) => {
  const token = req.headers[AUTHORIZATION];
  try {
    if (!token) {
      return res.status(401)
        .json({ message: tokenNotFoundError });
    }
    const decoded = jwt.verify(token, secret);
    const user = await Users.findOne({ where: { email: decoded.data } });

    if (!user) return res.status(401).json({ message: tokenInvalidError });

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).send({ message: tokenInvalidError });
  }
};

module.exports = tokenValidation;
