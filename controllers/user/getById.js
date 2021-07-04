const rescue = require('express-rescue');
const UserService = require('../../services/user');

const OK = 200;

module.exports = rescue(async (req, res, _next) => {
  const { id: userId } = req.params;

  const user = await UserService.getById(userId);

  res.status(OK).json(user);
});