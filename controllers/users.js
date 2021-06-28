const rescue = require('express-rescue');
const { CREATED, OK, NO_CONTENT } = require('../helpers');
const userService = require('../services');
const {
  createUserValidate,
  loginValidate,
  joiValidate,
} = require('../validations');

const createUser = rescue(async (req, res) => {
  await joiValidate(createUserValidate, req.body);
  const { displayName, email, password, image } = req.body;
  const token = await userService.createUser({ displayName, email, password, image });

  return res.status(CREATED).send({ token });
});

const login = rescue(async (req, res) => {
  await joiValidate(loginValidate, req.body);
  const { email, password } = req.body;
  const token = await userService.login({ email, password });

  return res.status(OK).send({ token });
});

const getAllUser = rescue(async (_req, res) => {
  const allUsers = await userService.getAllUsers();

  return res.status(OK).send(allUsers);
});

const getUserById = rescue(async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  return res.status(OK).send(user);
});

const deleteUser = rescue(async (req, res) => {
  const { id } = req.user;
  await userService.deleteUser(id);

  return res.status(NO_CONTENT).send({});
});

module.exports = {
  createUser,
  login,
  getAllUser,
  getUserById,
  deleteUser,
};
