// const UsersModel = require('../models/usersMod');
const userValidation = require('../validation/userValidation');
// const statusCode = require('../utils/statuscode');

const verifyValidation = (displayName, email, password) => {
  if (!email) {
    return { message: '"email" is required' };
  }

  if (!password) {
    return { message: '"password" is required' };
  }

  const callUserValidation = userValidation.controlValidation(displayName, email, password);
  console.log('callUserValidation', callUserValidation);

  if (callUserValidation.message) {
    return callUserValidation;
  }

  return true;
};

const checkEmail = (email) => {
  console.log(email);
  const emailAlreadyExists = true;
  if (emailAlreadyExists) {
    return { message: 'User already registered' };
  }
};

module.exports = {
  verifyValidation,
  checkEmail,
};