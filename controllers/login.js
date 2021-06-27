const rescue = require('express-rescue');
const loginService = require('../services/login');
const { OK } = require('../helpers/statusHttp');

const login = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  const loginSuccess = await loginService.login(email, password);
  
  if (loginSuccess.err) return next(loginSuccess);
  
  res.status(OK).json(loginSuccess);
});

module.exports = {
  login,
};
