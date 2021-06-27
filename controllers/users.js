const rescue = require('express-rescue');
const userService = require('../services/users');
const { CREATED } = require('../helpers/statusHttp');

const createUser = rescue(async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const newUser = await userService
    .createUser(displayName, email, password, image);

  if (newUser.err) return next(newUser);

  res.status(CREATED).json(newUser);
});

module.exports = {
  createUser,
};
