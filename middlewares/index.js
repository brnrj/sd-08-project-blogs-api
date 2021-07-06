const validateUser = require('./validateUser');
const validateLogin = require('./validateLogin');
const createToken = require('./createToken');
// const auth = require('./auth');
// const admin = require('./admin');
const error = require('./error');

module.exports = {
  validateUser,
  validateLogin,
  createToken,
  // auth,
  // admin,
  error,
};
