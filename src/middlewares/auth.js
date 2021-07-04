const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

module.exports = (req, _res, next) => {
  const { authorization: token } = req.headers;

  if (!token) throw boom.unauthorized('Token not found');

  let payload = null;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw boom.unauthorized('Expired or invalid token');
  }

  const { email, id } = payload;

  req.user = { email, id };

  next();
};
