const validateUserRegister = require('./UserRelated/checkUserRequest');
const eMiddleware = require('./Error/errorMiddleware');

module.exports = { validateUserRegister, eMiddleware };
