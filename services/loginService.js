const jwt = require('jsonwebtoken');
const LoginValidations = require('../validations/loginValidations');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const login = async (userLogin) => {
  LoginValidations.validateLogin(userLogin);

  const user = await LoginValidations.validateUserExists(userLogin);
  
  const { id, email, displayName } = user;
  
  const token = jwt.sign({ id, email, displayName }, secret, jwtConfig);

  return { token };
};

module.exports = {
  login,
};
