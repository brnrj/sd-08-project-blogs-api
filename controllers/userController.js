const userService = require('../services/userService');
const { responseCode } = require('../utils/responseCode');
const { generateToken } = require('../utils/handleToken');

const createUser = async (req, res, next) => {
  const newUser = await userService.createUser({ ...req.body });
  
  if (newUser.error) return next(newUser.error);

  const { id, email } = newUser;
  const token = generateToken({ id, email });
  
  return res.status(responseCode.CREATED).json({ token });
};

const userLogin = async (req, res, next) => {
  const user = await userService.findUserByEmail({ ...req.body });

  if (user.error) return next(user.error);

  const { id, email } = user;
  const token = generateToken({ id, email });
  
  return res.status(responseCode.OK).json({ token });
};

const findAllUsers = async (_req, res, _next) => {
  const users = await userService.findAllUsers();

  return res.status(responseCode.OK).json(users);
};

const findUserById = async (req, res, next) => {
  const { id } = req.params;

  const user = await userService.findUserById(id);

  if (user.error) return next(user.error);

  return res.status(responseCode.OK).json(user);
};

module.exports = { createUser, userLogin, findAllUsers, findUserById };
