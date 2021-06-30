const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();
const { 
  validateName,
  validateEmail,
  validatePassword,
  validateToken,
} = require('../validations');

const EMPTY = 0;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const validate = async (displayName, email, password) => {
  validateEmail.missingEmail(email);
  validatePassword.missingPassword(password);
  validateEmail.validateFormat(email);

  const user = await User.findAll({ where: { email } });
  if (user.length > EMPTY) throw new Error('User already registered$409');

  validateName.validateLength(displayName);
  validatePassword.passwordLength(password);
};

const create = async (reqBody) => {
  const user = await User.create(reqBody);

  const { password: ignore, ...otherInfo } = user;

  const token = jwt.sign({ data: otherInfo }, process.env.JWT_SECRET, jwtConfig);

  return token;
};

const validateLogin = async (email, password) => {
  validateEmail.missingEmail(email);
  validatePassword.missingPassword(password);

  validateEmail.emptyEmail(email);
  validatePassword.emptyPassword(password);

  const user = await User.findAll({ where: { email } });
  if (user.length === EMPTY) throw new Error('Invalid fields$400');
};

const login = async (email) => {
  const user = await User.findAll({
    where: {
      email,
    },
  });

  const { password: ignore, ...otherInfo } = user;

  const token = jwt.sign({ data: otherInfo }, process.env.JWT_SECRET, jwtConfig);

  return token;
};

const getAll = async (token) => {
  validateToken(token);

  const users = await User.findAll();

  const hidePassword = users.map((item) => {
    const { dataValues: { password: ignore, ...user } } = item;
    return user;
  });

  return hidePassword;
};

module.exports = {
  validate,
  create,
  validateLogin,
  login,
  getAll,
};
