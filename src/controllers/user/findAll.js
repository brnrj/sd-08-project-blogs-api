const rescue = require('../../utils/rescue');
const UserService = require('../../services/user');

module.exports = rescue(async (_req, res, _next) => {
  const result = await UserService.findAll();
  res.status(200).json(result);
});
