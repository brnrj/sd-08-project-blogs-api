const jwt = require('jsonwebtoken');

const { User } = require('../models/index.js');

const secret = 'sddsFrontEnd';

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const validateUser = (email, password) => {
  if (email === undefined) return '"email" is required';

  if (password === undefined) return '"password" is required';

  if (email.length === 0) return '"email" is not allowed to be empty';

  if (password.length === 0) return '"password" is not allowed to be empty';

  return undefined;
};

const login = async (email, password) => {
  const notValidUser = validateUser(email, password);

  if (notValidUser) {
    throw new Error(notValidUser);
  }

  const foundUser = await User.findOne({ where: { email, password } });

  if (!foundUser) {
    throw new Error('Invalid fields');
  }

  const token = jwt.sign({ email, password }, secret, jwtConfig);
  return token;
};

module.exports = { login };