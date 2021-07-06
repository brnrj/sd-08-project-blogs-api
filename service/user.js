require('dotenv/config');
const jwt = require('jsonwebtoken');

const { User } = require('../models/index.js');

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const validateUser = (displayName, email) => {
  if (displayName && displayName.length < 8) {
    return '"displayName" length must be at least 8 characters long';
  }

  if (!email) {
    return '"email" is required';
  }

  if (!regex.test(email)) {
    return '"email" must be a valid email';
  }
  return undefined;
};

const validatePassword = (password) => {
  if (!password) {
    return '"password" is required';
  }

  if (password.length < 6) {
    return '"password" length must be 6 characters long';
  }
  return undefined;
};

const newUser = async (displayName, email, password, image) => {
  const notValidUser = validateUser(displayName, email);
  const notValidPassword = validatePassword(password);

  if (notValidUser) throw new Error(notValidUser);

  if (notValidPassword) throw new Error(notValidPassword);

  const findUser = await User.findOne({ where: { email } });

  if (findUser) throw new Error('User already registered');
  
  await User.create({ displayName, email, password, image });

  const token = jwt.sign({ email, password }, process.env.JWT_SECRET, jwtConfig);
  return token;
};

const getAllUsers = async () => {
  const allUsers = await User.findAll();
  return allUsers;
};

const getById = async (id) => {
  const findUser = await User.findOne({ where: { id } });

  if (!findUser) throw new Error('User does not exist');

  return findUser;
};

module.exports = { newUser, getAllUsers, getById };