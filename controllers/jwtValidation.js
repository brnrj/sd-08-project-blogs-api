const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const { UNAUTHORIZATION } = require('./errosHttps');

const secret = 'mlbbEshow';

const noToken = (token) => {
  if (token === undefined || token.length === 0) {
    return { erro: {
      code: UNAUTHORIZATION,
      message: 'Token not found',
    } };
  }
};

const tokenBadFormed = async (token) => {
  try {
    const decode = jwt.verify(token, secret);

    const user = await Users.findOne({ where: { email: decode.data.email } });

    if (!user) {
      return { erro: {
        code: UNAUTHORIZATION,
        message: 'Expired or invalid token',
      } };
    }
    } catch (_err) {
      return { erro: {
        code: UNAUTHORIZATION,
        message: 'Expired or invalid token',
      } };  
    }
};

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  const tokenIsNoExists = noToken(token);
  const tokenIsBadFormed = await tokenBadFormed(token);
  
  if (tokenIsBadFormed || tokenIsNoExists) {
    const { erro } = tokenIsNoExists || tokenIsBadFormed;
    return res.status(erro.code).json({ message: erro.message });
  }
  next();
};

module.exports = verifyToken;
