const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const loginValidation = require('../validation/loginValidation');
const secret = require('../utils/secretJWT');

const filterAllUserBy = async (email, password) => {
  const searchEmail = await User.findOne({ where: { email, password } });
  return searchEmail !== null;
};

const verifyValidation = (email, password) => {
  // console.log('verifyValidation', password);
  const isEmailValid = loginValidation.verifyEmail(email);
  const isPasswordValid = loginValidation.verifyPassword(password);
  
  if (isEmailValid.message) {
    return isEmailValid;
  }

  if (isPasswordValid.message) {
    return isPasswordValid;
  }

  return true;
};

const createToken = (email) => {
  const payload = {
    email,
  };
   
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  
  const token = jwt.sign({ data: payload }, secret, jwtConfig);

  return token;
};

const checkLogin = async (email, password) => {
  // console.log('checkLogin', email);
  const emailAlreadyExists = await filterAllUserBy(email, password);
    // console.log('emailAlreadyExists', emailAlreadyExists);

  if (emailAlreadyExists === false) {
    return { message: 'Invalid fields' };
  }

  return createToken(email);
};

module.exports = {
  verifyValidation,
  checkLogin,
  filterAllUserBy,
  createToken,
};
