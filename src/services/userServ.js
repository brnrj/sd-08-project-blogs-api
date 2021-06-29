const jwt = require('jsonwebtoken');
// const UsersModel = require('../models/usersMod');
const userValidation = require('../validation/userValidation');
// const statusCode = require('../utils/statuscode');
const { User } = require('../../models');

const secret = 'cookmaster';

const filterAllUserByEmail = async (email) => {
  const searchEmail = await User.findOne({ where: { email } });
  return searchEmail === null;
};

const verifyValidation = (displayName, email, password) => {
  if (email === undefined) {
    return { message: '"email" is required' };
  }

  if (password === undefined) {
    return { message: '"password" is required' };
  }

  const callUserValidation = userValidation.controlValidation(displayName, email, password);
  console.log('callUserValidation', callUserValidation);

  if (callUserValidation.message) {
    return callUserValidation;
  }

  return true;
};

const checkEmail = async (email) => {
  console.log(email);
  const emailAlreadyExists = await filterAllUserByEmail(email);
    console.log('emailAlreadyExists', emailAlreadyExists);

  if (emailAlreadyExists === false) {
    return { message: 'User already registered' };
  }

  return true;
};

const createUser = async (displayName, email, password, image) => {
  const userCreated = await User.create({ displayName, email, password, image });
  return userCreated;
};

const createToken = (email) => {
  const payload = {
    email,
  };
  
  console.log('payload', payload);
    
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  
  const token = jwt.sign({ data: payload }, secret, jwtConfig);

  return token;
};

module.exports = {
  verifyValidation,
  checkEmail,
  filterAllUserByEmail,
  createUser,
  createToken,
};
