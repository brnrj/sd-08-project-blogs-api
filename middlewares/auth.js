const rescue = require('express-rescue');
const boom = require('@hapi/boom');

const { verifyToken } = require('../utils/token');

module.exports = rescue((req, _res, next) => {
  const { authorization: token } = req.headers;

  if (!token) throw boom.unauthorized('Token not found');

  const decoded = verifyToken(token);
  console.log(decoded);
  if (decoded) {
    const { id, email } = decoded;

    req.user = { email, id };
  }

  next();
});