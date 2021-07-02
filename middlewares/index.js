const validateUserRegister = require('./UserRelated/checkUserRequest');
const validateLogin = require('./LoginRelated/checkLoginRequest');
const verifyIfIdMatches = require('./UserRelated/checkIdParams');
const verifyCategoryRequest = require('./CategoryRelated/checkCategoryRequest');
const verifyToken = require('./auth/checkToken');
const eMiddleware = require('./Error/errorMiddleware');

module.exports = {
  validateUserRegister,
  validateLogin,
  verifyIfIdMatches,
  verifyCategoryRequest,
  eMiddleware,
  verifyToken,
};
