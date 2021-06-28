const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('../models');
const { generateToken } = require('./jwt');
const {
  BAD_REQUEST,
  CONFLICT,
} = require('./consts');

const app = express();
app.use(bodyParser.json());

const requestError = (message, status) => {
  throw Object.assign(
    new Error(message),
    { status },
 );
};

const isValidEmail = (email) => {
  const emailRegex = /^([a-zA-Z0-9_-]+)@([a-zA-Z_-]+)/;
  return emailRegex.test(email);
};

const isConflictEmail = async (email) => {
  const userFound = await User.findOne({ where: { email } });
  return userFound !== null;
};

const emailValidations = async (email) => {
  if (!email) {
    requestError('"email" is required', BAD_REQUEST);
  }
  if (!isValidEmail(email)) {
    requestError('"email" must be a valid email', BAD_REQUEST);
  }
  if (await isConflictEmail(email)) {
    requestError('User already registered', CONFLICT);    
  }
};

const isValidDisplayName = (displayName) => displayName.length >= 8;

const displayValidation = (displayName) => {
  if (!isValidDisplayName(displayName)) {
    requestError('"displayName" length must be at least 8 characters long', BAD_REQUEST);
  }
};

const isValidPassWord = (password) => password.length >= 6;

const passwordValidation = (password) => {
  if (!password) {
    requestError('"password" is required', BAD_REQUEST);
  }
  if (!isValidPassWord(password)) {
    requestError('"password" length must be 6 characters long', BAD_REQUEST);
  }
};

const Validations = async (body) => {
  const { email, displayName, password } = body;
  await emailValidations(email);
  displayValidation(displayName);
  passwordValidation(password);
};

// 1 - Crie um endpoint para o cadastro de usuários
const tryAddUser = async (req, res, next) => {
  try {
    const { body } = req;
    await Validations(body);
    const { password, ...remainingbody } = body;
    await User.create(body);
    const token = generateToken({ ...remainingbody });
    req.token = token;
    next();
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  tryAddUser,
};