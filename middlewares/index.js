const validateUserRegister = require('./UserRelated/checkUserRequest');
const eMiddleware = require('./Error/errorMiddleware');
const validateLogin = require('./LoginRelated/checkLoginRequest');

module.exports = { validateUserRegister, eMiddleware, validateLogin };
