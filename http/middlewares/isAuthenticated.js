const HandleError = require('../errors/HandleError');
const { decodeToken } = require('../../config/jwtConfig');

module.exports = function isAuthenticated(req, _res, next) {
  const { authorization } = req.headers;
  if (!authorization) throw new HandleError('Token not found', 401);
    const sub = decodeToken(authorization);
    if (!sub) throw new HandleError('Expired or invalid token', 401);
    req.user = { id: sub };
    next();
};
