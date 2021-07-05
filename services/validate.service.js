const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
const { REGEX_EMAIL } = require('../shared/defs');

const secret = 'seusecretdetoken';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const invalidUser = (name, email) => {
  if (name.length < 8) {
    return '"displayName" length must be at least 8 characters long';
  }
  if (!email) return '"email" is required';
  if (!REGEX_EMAIL.test(email)) return '"email" must be a valid email';
  return undefined;
};

const invalidPassword = (password) => {
  if (!password) return '"password" is required';
  if (typeof password !== 'string' || !password.length) {
    return '"password" is not allowed to be empty';
  }
  if (password.length < 6) return '"password" length must be 6 characters long';
  return undefined;
};

const userValidate = async (displayName, email, password, image) => {
  const isUserInvalid = invalidUser(displayName, email);
  const isPasswordInvalid = invalidPassword(password);
  if (isUserInvalid) throw new Error(isUserInvalid);
  if (isPasswordInvalid) throw new Error(isPasswordInvalid);
  const searchResult = await User.FindOne({ where: { email } });
  if (searchResult) throw new Error('User already registered');

  await User.create({ displayName, email, password, image });
  const token = jwt.sign({ displayName, email, image }, secret, jwtConfig);
  return token;
};

const getAllFromDB = async () => {
  const searchResult = await User.findAll();
  return searchResult;
};

const findUser = async (id) => {
  const searchResult = await User.FindOne({ where: { id } });
  if (!searchResult) throw new Error('User does not exist');
  return searchResult;
};

module.exports = {
  userValidate,
  getAllFromDB,
  findUser,
};
