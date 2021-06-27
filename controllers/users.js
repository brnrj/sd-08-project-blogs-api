const rescue = require('express-rescue');
const userService = require('../services/users');
const { CREATED, OK } = require('../helpers/statusHttp');

const createUser = rescue(async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const newUser = await userService
    .createUser(displayName, email, password, image);

  if (newUser.err) return next(newUser);

  return res.status(CREATED).json(newUser);
});

const findAllUsers = rescue(async (req, res, next) => {
  const allUsers = await userService.findAllUsers();
  if (allUsers.err) return next(allUsers);

  return res.status(OK).json(allUsers);
});

const findUserById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const user = await userService.findUserById(id);
  if (user.err) return next(user);

  return res.status(OK).json(user);
});

module.exports = {
  createUser,
  findAllUsers,
  findUserById,
};
