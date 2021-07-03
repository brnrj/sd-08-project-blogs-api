const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();
const { validateUser, validateToken } = require('../validations');

const EMPTY = 0;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const validate = async (displayName, email, password) => {
  validateUser.missingEmail(email);
  validateUser.missingPassword(password);
  validateUser.validateFormat(email);

  const user = await User.findAll({ where: { email } });
  if (user.length > EMPTY) throw new Error('User already registered$409');

  validateUser.validateLength(displayName);
  validateUser.passwordLength(password);
};

const create = async (reqBody) => {
  const user = await User.create(reqBody);

  const { password: ignore, ...otherInfo } = user;

  const token = jwt.sign({ data: otherInfo }, process.env.JWT_SECRET, jwtConfig);

  return token;
};

const validateLogin = async (email, password) => {
  validateUser.missingEmail(email);
  validateUser.missingPassword(password);

  validateUser.emptyEmail(email);
  validateUser.emptyPassword(password);

  const user = await User.findAll({ where: { email } });
  if (user.length === EMPTY) throw new Error('Invalid fields$400');
};

const login = async (email) => {
  const user = await User.findOne({
    where: {
      email,
    },
    attributes: { 
      exclude: ['password'],
    },
  });
 
  const token = jwt.sign({ data: user }, process.env.JWT_SECRET, jwtConfig);
  return token;
};

const getAll = async (token) => {
  validateToken(token);

  const users = await User.findAll({
    attributes: { 
      exclude: ['password'],
    },
  });

  return users;
};

const getById = async (token, id) => {
  validateToken(token);

  const user = await User.findOne({
    where: {
      id,
    },
    attributes: { 
      exclude: ['password'],
    },
  });

  if (!user) throw new Error('User does not exist$404');
  
  return user;
};

module.exports = {
  validate,
  create,
  validateLogin,
  login,
  getAll,
  getById,
};
