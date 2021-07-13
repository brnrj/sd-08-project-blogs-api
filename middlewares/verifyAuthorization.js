const rescue = require('express-rescue');
const validateToken = require('../auth/validateToken');

const errorClient = require('../utils/errorClient');

const verifyAuthorization = rescue(async (req, _res, next) => {
  const { authorization: token } = req.headers;
  
  if (!token) return next(errorClient.unauthorized('Token not found'));

  const check = validateToken(token);
  if (!check) return next(next(errorClient.unauthorized('Expired or invalid token')));

  next();
});
module.exports = verifyAuthorization;
