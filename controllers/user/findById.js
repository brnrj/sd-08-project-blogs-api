const UserService = require('../../services/user');
const rescue = require('../../utils/rescue');

module.exports = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const result = await UserService.findById(id);
  res.status(200).json(result);
});
