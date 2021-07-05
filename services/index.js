const { auth } = require('./auth');
const { tokenCreate } = require('./token');
const { validata, validlogin } = require('./validata');

module.exports = {
  auth,
  tokenCreate,
  validata,
  validlogin,
};
