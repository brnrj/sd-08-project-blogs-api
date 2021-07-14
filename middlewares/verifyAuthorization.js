const rescue = require('express-rescue');
const validateToken = require('../auth/validateToken');
const { Users } = require('../models');

const errorClient = require('../utils/errorClient');

const verifyAuthorization = rescue(async (req, _res, next) => {
  const { authorization: token } = req.headers;
  
  if (!token) return next(errorClient.unauthorized('Token not found'));

  const decode = validateToken(token);
  if (!decode) return next(next(errorClient.unauthorized('Expired or invalid token')));

const { email } = decode;

const user = await Users.findOne({ where: { email } });

req.idUser = user.dataValues.id;

  next();
});
module.exports = verifyAuthorization;
