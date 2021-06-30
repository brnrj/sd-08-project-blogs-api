const UserService = require('../../services/user');
const { errorHandling } = require('../../utils');

module.exports = errorHandling(async (req, res, _next) => {
  const result = await UserService.findAll();

  res.status(200).json(result);
});
