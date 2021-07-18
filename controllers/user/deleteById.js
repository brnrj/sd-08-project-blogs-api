const UserService = require('../../services/user');
const { errorHandling } = require('../../utils');

module.exports = errorHandling(async (req, res, _next) => {
  const { id } = req.user;

  await UserService.deleteById(id);

  res.sendStatus(204);
});
