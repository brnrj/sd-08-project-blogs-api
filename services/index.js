const { auth } = require('./auth');
const { loginCheck, loginFindCheck } = require('./login');
const { createToken } = require('./token');
const { userCheck, emailCheck, userCreate } = require('./user');
const { status, message } = require('./statusMessages');

module.exports = {
  auth,
  loginCheck,
  loginFindCheck,
  createToken,
  userCheck,
  emailCheck,
  userCreate,
  status,
  message,
};