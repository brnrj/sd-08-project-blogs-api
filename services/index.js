const { auth } = require('./auth');
const { loginCheck } = require('./login');
const { status, message } = require('./statusMessages');

module.exports = {
  auth,
  loginCheck,
  status,
  message,
};