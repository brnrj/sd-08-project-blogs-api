const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('../../models');
const {
  BAD_REQUEST,
  CONFLICT,
  NOT_FOUND,
} = require('../consts');
const { requestError } = require('../requestError');

const app = express();
app.use(bodyParser.json());

const isValidEmail = (email) => {
  const emailRegex = /^([a-zA-Z0-9_-]+)@([a-zA-Z_-]+)/;
  return emailRegex.test(email);
};

const isExistingEmailInDB = async (email) => {
  const userFound = await User.findOne({ where: { email } });
  return userFound !== null;
};

const decisionAboutExistingEmailInDB = async (email, type) => {
  const existingEmail = await isExistingEmailInDB(email);
  if (existingEmail && type === 'register') {
    requestError('User already registered', CONFLICT);
  }
  if (!existingEmail && type === 'login') {
    requestError('Invalid fields', BAD_REQUEST);
  }
};

const emailValidations = async (email, type) => {
  if (email === '') {
    requestError('"email" is not allowed to be empty', BAD_REQUEST);
  }
  if (!email) {
    requestError('"email" is required', BAD_REQUEST);
  }
  if (!isValidEmail(email)) {
    requestError('"email" must be a valid email', BAD_REQUEST);
  }
  await decisionAboutExistingEmailInDB(email, type);
};

const isValidDisplayName = (displayName) => displayName.length >= 8;

const displayValidation = (displayName) => {
  if (!isValidDisplayName(displayName)) {
    requestError('"displayName" length must be at least 8 characters long', BAD_REQUEST);
  }
};

const isValidPassWord = (password) => password.length >= 6;

const passwordValidation = (password) => {
  if (password === '') {
    requestError('"password" is not allowed to be empty', BAD_REQUEST);
  }
  if (!password) {
    requestError('"password" is required', BAD_REQUEST);
  }
  if (!isValidPassWord(password)) {
    requestError('"password" length must be 6 characters long', BAD_REQUEST);
  }
};

const userRegisterValidations = async (req, res, next) => {
  const { email, displayName, password } = req.body;
  try {
    await emailValidations(email, 'register');
    displayValidation(displayName);
    passwordValidation(password);
    next();
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const loginValidations = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    await emailValidations(email, 'login');
    passwordValidation(password);
    next();
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const isValidId = (user) => {
  if (!user) {
    requestError('User does not exist', NOT_FOUND);
  }
};

const findUserByIdValidation = async (req, res, next) => {
  const { id } = req.params;
  try {
  const user = await User.findByPk(id);
  isValidId(user);
  req.user = user;
  next();
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  userRegisterValidations,
  loginValidations,
  findUserByIdValidation,
};