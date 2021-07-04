const jwt = require('jsonwebtoken');
const { User } = require('../models');
const secret = require('../utils/secret');

const BAD_REQUEST = 400;

const getEmailError = (email) => {
  if (email === undefined) return { status: BAD_REQUEST, message: '"email" is required' };
  if (email === '') {
    return { 
      status: BAD_REQUEST,
      message: '"email" is not allowed to be empty' };
  }
};

const getPasswordError = (password) => {
  if (password === undefined) return { status: BAD_REQUEST, message: '"password" is required' };
  if (password === '') {
    return { 
      status: BAD_REQUEST,
      message: '"password" is not allowed to be empty' };
  }
};

const validateUserCreation = async ({ email, password }) => {
  const emailErrors = getEmailError(email);
  const passwordErrors = getPasswordError(password);
  if (emailErrors) return { error: emailErrors };
  if (passwordErrors) return { error: passwordErrors };

  const user = await User.findOne({
    where: {
      email,
      password,
    },
  });

  if (!user) return { error: { status: 400, message: 'Invalid fields' } };

  const { password: pw, ...safeUserData } = user.dataValues;

  const token = jwt.sign({ data: safeUserData },
    secret, { algorithm: 'HS256', expiresIn: '1d' });
  return { token };
};

module.exports = validateUserCreation;