const jwt = require('jsonwebtoken');
const { User } = require('../models/index.js');

const secret = 'seusecretdetoken';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};
const EIGHT = 8;
const SIX = 6;
// regex tirada do: https:/ / formik.org / docs / guides / validation;
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const isValidUser = (displayName, email) => {
  if (displayName && displayName.length < EIGHT) {
    return '"displayName" length must be at least 8 characters long';
  }

  if (!email) return '"email" is required';

  if (!regexEmail.test(email)) return '"email" must be a valid email';

  return undefined;
};

const isValidPassword = (password) => {
  if (!password) return '"password" is required';

  if (password.length < SIX) return '"password" length must be 6 characters long';
  return undefined;
};

const validUser = async (displayName, email, password, image) => {
  console.log(displayName, email, password, image);
  const notUser = isValidUser(displayName, email);
  const notPassword = isValidPassword(password);
  
  if (notUser) throw new Error(notUser);
  
  if (notPassword) throw new Error(notPassword);

  const findUser = await User.findOne({ where: { email } });
  
  if (findUser) throw new Error('User already registered');

  await User.create({ displayName, email, password, image });

  const token = jwt.sign({ displayName, email, image }, secret, jwtConfig);
  return token; // obj com a chave token arrumar 
};

module.exports = { validUser };
