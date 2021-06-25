const rescue = require('express-rescue');
const userService = require('../services/userService');

const CREATED_STATUS = 201;
const OK_STATUS = 200;

const insertUser = rescue(async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const result = await userService.insertUser(
    displayName,
    email,
    password,
    image,
  );
  if (result.err) return next(result);
  return res.status(CREATED_STATUS).json(result);
});

const getAllUsers = rescue(async (req, res, _next) => {
  const result = await userService.getAllUsers();
  return res.status(OK_STATUS).json(result);
});

module.exports = {
  insertUser,
  getAllUsers,
};
