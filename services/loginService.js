const jwt = require('jsonwebtoken');
const { User } = require('../models');
const validateEmail = require('./userValidations/validateEmail');
const validatePassword = require('./userValidations/validatePassword');

const BAD_REQUEST_STATUS = 400;
const { JWT_SECRET } = process.env;

const login = async (email, password) => {
  const emailValidate = await validateEmail(email);
  const passwordValidate = await validatePassword(password);
  if (
    emailValidate.err
    && emailValidate.err.message !== 'User already registered'
  ) return emailValidate;
  if (passwordValidate.err) return passwordValidate;
  const userExist = await User.findOne({ where: { email } });
  if (!userExist) return { err: { status: BAD_REQUEST_STATUS, message: 'Invalid fields' } };
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const user = { email };
  const token = jwt.sign({ data: user }, JWT_SECRET, jwtConfig);
  return { token };
};

module.exports = { login };
