const jwt = require('jsonwebtoken');
const { customError } = require('../utils');

module.exports = (req, _res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return next(customError('Token not found', 'notFound'));

  let payload = null;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return next(customError('Expired or invalid token', 'invalidToken'));
  }

  const { email, id } = payload;

  req.user = { email, id };

  next();
};
