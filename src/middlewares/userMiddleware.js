const { User } = require('../models');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const CONFLICT = 409;
const MIN_DISPLAYNAME_LENGTH = 8;
const MIN_PASSWORD_LENGTH = 6;

const errors = {
  invalidEmail: '"email" must be a valid email',
  requiredEmail: '"email" is required',
  displayNameLength: '"displayName" length must be at least 8 characters long',
  requiredPassword: '"password" is required',
  passwordLength: '"password" length must be 6 characters long',
  registeredUser: 'User already registered',
  notFound: 'User does not exist',
};

const verifyEmail = async (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!email) return res.status(BAD_REQUEST).json({ message: errors.requiredEmail });
  if (!emailRegex.test(email)) {
    return res.status(BAD_REQUEST).json({ message: errors.invalidEmail });
  }
  next();
};

const verifyDisplayName = async (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < MIN_DISPLAYNAME_LENGTH) {
    return res.status(BAD_REQUEST).json({ message: errors.displayNameLength });
  }
  next();
};

const verifyPassword = async (req, res, next) => {
  const { password } = req.body;
  if (!password) return res.status(BAD_REQUEST).json({ message: errors.requiredPassword });
  if (password.length < MIN_PASSWORD_LENGTH) {
    return res.status(BAD_REQUEST).json({ message: errors.passwordLength });
  }
  next();
};

const verifyIfUserExists = async (req, res, next) => {
  const { email } = req.body;
  const findUser = await User.findOne({ where: { email } });
  if (findUser !== null) {
    return res.status(CONFLICT).json({ message: errors.registeredUser });
  }
  next();
};

const verifyUserId = async (req, res, next) => {
  const { id } = req.params;
  const findUserId = await User.findOne({ where: { id } });
  if (!findUserId) {
    return res.status(NOT_FOUND).json({ message: errors.notFound });
  }
  next();
};

module.exports = {
  verifyEmail,
  verifyDisplayName,
  verifyPassword,
  verifyIfUserExists,
  verifyUserId,
};