const userValidation = require('./userValidation');
const loginValidation = require('./loginValidation');
const checkUser = require('./checkUser');
const generateToken = require('./generateToken');
const checkToken = require('./checkToken');

module.exports = {
  userValidation,
  loginValidation,
  checkUser,
  generateToken,
  checkToken,
};
