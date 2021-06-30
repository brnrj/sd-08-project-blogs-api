const jwt = require('jsonwebtoken');

// const { User } = require('../models/index.js');

require('dotenv/config');

const jwtConfig = {
  expiresIn: '10d',
  algorithm: 'HS256',
};

const validateUser = (email, password) => {
  if (email === undefined) {
    return '"email" is required';
  }
  if (password === undefined) {
    return '"password" is required';
  }
  if (email.length === 0) {
    return '"email" is not allowed to be empty';
  }
  if (password.length === 0) {
    return '"password" is not allowed to be empty';
  }
  return undefined;
};

// const validateEmpty = (email, password) => {
//   if (email.length === 0) {
//     return '"email" is not allowed to be empty';
//   }
//   if (password.length === 0) {
//     return '"password" is not allowed to be empty';
//   }
//   return undefined;
// };

const login = async (email, password) => {
  const invalidUser = validateUser(email, password);
  // const empty = validateEmpty(email, password);

  if (invalidUser) {
    throw new Error(invalidUser);
  }
  // if (empty) {
  //   throw new Error(empty);
  // }

  // if (email.length === 0) {
  //   throw new Error('"email" is not allowed to be empty');
  // }
  // if (password.length === 0) {
  //   throw new Error('"password" is not allowed to be empty');
  // }

  const token = jwt.sign({ email, password }, process.env.JWT_SECRET, jwtConfig);
  return token;
};

module.exports = {
  login,
};
