const rescue = require('../../utils/rescue');
const UserService = require('../../services/user');

module.exports = rescue(async (req, res, _next) => {
  const { id } = req.user;
  await UserService.destroy(id);
  res.sendStatus(204);
});
