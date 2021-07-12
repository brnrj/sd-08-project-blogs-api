const UserService = require('../../services/user');
const rescue = require('../../utils/rescue');

module.exports = rescue(async (req, res, _next) => {
  const { id } = req.user;  
  await UserService.destroy(id);
  res.sendStatus(204);
});
