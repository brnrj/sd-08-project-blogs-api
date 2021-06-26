const HandleError = require('../errors/HandleError');
const { decodeToken } = require('../../config/jwtConfig');

module.exports = function isAuthenticated(req, res, next) {
  const { authorization } = req.headers;

  try {
  if (!authorization) throw new HandleError('Token not found', 401);
    const accessToken = decodeToken(authorization);
    if (!accessToken) throw new HandleError('Expired or invalid token', 401);
    req.user = accessToken.user;
    next();
    } catch (error) {
      res.status(401).json({ message: error.message });      
    }
};
