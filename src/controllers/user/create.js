const rescue = require('../../utils/rescue');
const UserService = require('../../services/user');

module.exports = rescue(async (req, res, _next) => {
  const { displayName, email, password, image } = req.body;
  const result = await UserService.create({ displayName, email, password, image });
  res.status(201).json(result);
});
