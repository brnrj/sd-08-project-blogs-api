const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { BAD_REQUEST } = require('../helpers/statusHttp');
const validateEmail = require('./validations/users/email');
const validatePassword = require('./validations/users/password');

const { JWT_SECRET } = process.env;

const login = async (email, password) => {
  const emailValidate = await validateEmail(email);
  const passwordValidate = await validatePassword(password);

  if (
    emailValidate.err && emailValidate.err.message !== 'User already registered'
  ) return emailValidate;

  if (passwordValidate.err) return passwordValidate;

  const emailExists = await User.findOne({ where: { email } });
  if (!emailExists) return { err: { status: BAD_REQUEST, message: 'Invalid fields' } };

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const user = { email };
  const token = jwt.sign({ data: user }, JWT_SECRET, jwtConfig);

  return { token };
};

module.exports = {
  login,
};
