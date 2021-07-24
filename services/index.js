const { auth } = require('./auth');
const { loginCheck } = require('./login');
const { createToken } = require('./token');
const { status, message } = require('./statusMessages');

module.exports = {
  auth,
  loginCheck,
  createToken,
  status,
  message,
};