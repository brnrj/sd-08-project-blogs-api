const registerMiddlewares = require('./validateUserRegister');
const loginMiddlewares = require('./validateLogin');

module.exports = {
  registerMiddlewares,
  loginMiddlewares,
};
