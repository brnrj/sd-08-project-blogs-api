const UserService = require('../../services/user');
const rescue = require('../../utils/rescue');

module.exports = rescue(async (_req, res, _next) => {
  const result = await UserService.findAll();
  res.status(200).json(result);
});
