const validateUserRegister = require('./UserRelated/checkUserRequest');
const validateLogin = require('./LoginRelated/checkLoginRequest');
const verifyIfUserIdMatches = require('./UserRelated/checkUserIdParams');
const verifyCategoryRequest = require('./CategoryRelated/checkCategoryRequest');
const verifyIfCatgIdMatches = require('./CategoryRelated/checkCategoryIdParams');
const {
  verifyBPostsRequestRegister, verifyIfPostIdExist,
} = require('./BlogPostsRelated/checkBPostRequest');
const verifyToken = require('./auth/checkToken');
const eMiddleware = require('./Error/errorMiddleware');

module.exports = {
  validateUserRegister,
  validateLogin,
  verifyIfUserIdMatches,
  verifyCategoryRequest,
  verifyIfCatgIdMatches,
  verifyBPostsRequestRegister,
  verifyIfPostIdExist,
  eMiddleware,
  verifyToken,
};
