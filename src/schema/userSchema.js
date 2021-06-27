require('dotenv').config();
const UserModel = require('../models/users');

const BAD_REQUEST = 400;
const CONFLICT = 409;
const MIN_DISPLAYNAME_LENGTH = 8;
const MIN_PASSWORD_LENGTH = 6;

const errors = {
  invalidEmail: '"email" must be a valid email',
  requiredEmail: '"email" is required',
  displaNameLength: '"displayName" length must be at least 8 characters long',
  requiredPassword: '"password" is required',
  passwordLength: '"password" length must be 6 characters long',
  registeredUser: 'User already registered',
};

const verifyEmail = async (email) => {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!email) {
    return {
      code: BAD_REQUEST,
      message: errors.requiredEmail,
    };
  }
  if (!emailRegex.test(email)) {
    return {
      code: BAD_REQUEST,
      message: errors.invalidEmail,
    };
  }
};

const verifyDisplayName = async (displayName) => {
  if (displayName < MIN_DISPLAYNAME_LENGTH) {
    return {
      code: BAD_REQUEST,
      message: errors.displaNameLength,
    };
  }
};

const verifyPassword = async (password) => {
  if (!password) {
    return {
      code: BAD_REQUEST,
      message: errors.requiredPassword,
    };
  }
  if (password < MIN_PASSWORD_LENGTH) {
    return {
      code: BAD_REQUEST,
      message: errors.passwordLength,
    };
  }
};

const verifyIfUserExists = async (email) => {
  const findUser = await UserModel
    .findOne({ where: { email } });
  if (findUser !== null) {
    return {
      code: CONFLICT,
      message: errors.registeredUser,
    };
  }
};

module.exports = {
  verifyEmail,
  verifyDisplayName,
  verifyPassword,
  verifyIfUserExists,
};