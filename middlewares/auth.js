const rescue = require('express-rescue');
const boom = require('@hapi/boom');

const { verifyToken } = require('../utils/token');

module.exports = rescue((req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) throw boom.unauthorized('Token not found');

  const decoded = verifyToken(token);

  const { id, email } = decoded;

  req.user = { email, id };

  next();
});