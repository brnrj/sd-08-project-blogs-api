const jwt = require('jsonwebtoken');
const { User } = require('../models');
const secret = require('../utils/secret');

const BAD_REQUEST = 400;
const CONFLICT = 409;

const getDisplayNameError = (displayName) => (displayName.length < 8 
    ? { status: BAD_REQUEST, message: '"displayName" length must be at least 8 characters long' }
    : null);

const getEmailError = (email) => {
  if (!email) return { status: BAD_REQUEST, message: '"email" is required' };
  if (!/.+@.+\.(.+)/.test(email)) {
    return { 
      status: BAD_REQUEST,
      message: '"email" must be a valid email' };
  }
};

const getPasswordError = (password) => {
  if (!password) return { status: BAD_REQUEST, message: '"password" is required' };
  if (password.length < 6) {
    return { 
      status: BAD_REQUEST,
      message: '"password" length must be 6 characters long' };
  }
};

const validateUserCreation = async ({ displayName, email, password, image }) => {
  const dnErrors = getDisplayNameError(displayName);
  const emailErrors = getEmailError(email);
  const passwordErrors = getPasswordError(password);
  if (dnErrors) return { error: dnErrors };
  if (emailErrors) return { error: emailErrors };
  if (passwordErrors) return { error: passwordErrors };
  const foundUser = await User.findOne({ where: { email } });
  if (foundUser) {
    return { error: {
      status: CONFLICT,
      message: 'User already registered',
    } };
  }
  const newUser = await User.create({ displayName, email, password, image });
  const { password: pw, ...safeUserData } = newUser;
  const token = jwt.sign({ data: safeUserData },
    secret, { algorithm: 'HS256', expiresIn: '1d' });
  return { token };
};

module.exports = validateUserCreation;