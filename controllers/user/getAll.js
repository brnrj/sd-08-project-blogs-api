const rescue = require('express-rescue');
const UserService = require('../../services/user');

const OK = 200;

module.exports = rescue(async (_req, res, _next) => {
  const users = await UserService.getAll();
  res.status(OK).json(users);
});