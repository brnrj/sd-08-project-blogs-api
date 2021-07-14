const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const { UNAUTHORIZATION } = require('./errosHttps');

const secret = 'mlbbEshow';

const tokenBadFormed = (token) => {
  try {
    return jwt.verify(token, secret);
    } catch (_err) {
      return false;  
    }
};

const verifyToken = async (req, res, next) => {
  const { authorization: token } = req.headers;
  
  if (!token) {
    return res.status(UNAUTHORIZATION).json({
      message: 'Token not found', 
    });
  }

  const decode = tokenBadFormed(token);

  if (!decode) {
    return res.status(UNAUTHORIZATION).json({
      message: 'Expired or invalid token',
    });
  }

  const { email } = decode;

  const user = await Users.findOne({ where: { email } });
  
  req.idUser = user.dataValues.id;

  return next();
};

module.exports = verifyToken;
