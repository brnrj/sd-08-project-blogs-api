const userValidation = require('./userValidation');
const loginValidation = require('./loginValidation');
const checkUser = require('./checkUser');
const generateToken = require('../middlewares/generateToken');

module.exports = {
  userValidation,
  loginValidation,
  checkUser,
  generateToken
};
