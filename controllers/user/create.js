const rescue = require('express-rescue');
const UserService = require('../../services/user');

const CREATED = 201;

module.exports = rescue(async (req, res, _next) => {
  const { displayName, email, password, image = null } = req.body;
  const newUser = await UserService.create({ displayName, email, password, image });

  res.status(CREATED).json(newUser);
});