const rescue = require('../../utils/rescue');
const UserService = require('../../services/user');

module.exports = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const result = await UserService.findById(id);
  res.status(200).json(result);
});
