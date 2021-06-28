const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { UNAUTHORIZED, NOT_FOUND } = require('../helpers');

const { JWT_SECRET } = process.env;

const config = {
  expiresIn: '1D',
  algorithm: 'HS256',
};

const generateToken = (userNoPass) => jwt.sign(userNoPass, JWT_SECRET, config);

const tokenNotFound = {
  status: UNAUTHORIZED,
  message: 'Token not found',
};

const userNotFound = {
  status: NOT_FOUND,
  message: 'User does not exist',
};

const validationToken = async (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) next(tokenNotFound); 

  try {
    const validation = jwt.verify(authorization, JWT_SECRET);
    const { id } = validation;
    const userAlreadtExists = await User.findOne({ where: { id } });
    if (!userAlreadtExists) next(userNotFound);

    const { dataValues: { password: _noPassword, ...userNoPass } } = userAlreadtExists;
    req.user = userNoPass;

    next();
  } catch (error) {
    next({ status: UNAUTHORIZED, message: 'Expired or invalid token' });
  } 
};

module.exports = {
  generateToken,
  validationToken,
};
