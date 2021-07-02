const validateUserRegister = require('./UserRelated/checkUserRequest');
const eMiddleware = require('./Error/errorMiddleware');
const validateLogin = require('./LoginRelated/checkLoginRequest');
const verifyToken = require('./auth/checkToken');
const verifyIfIdMatches = require('./UserRelated/checkIdParams');

module.exports = { validateUserRegister, eMiddleware, validateLogin, verifyToken, verifyIfIdMatches };
