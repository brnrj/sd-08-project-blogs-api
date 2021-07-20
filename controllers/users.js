const User = require('../services/users');

const CREATED = 201;
const STATUS_OK = 200;

const addUser = async (req, res) => {
  const userInfo = req.body;
  const token = await User.addUser(userInfo);

  return res.status(CREATED).json({ token });
};

const findAllUsers = async (req, res) => {
  const allUsers = await User.findAllUsers();
  return res.status(STATUS_OK).json(allUsers);
};

const findUserById = async (req, res) => {
  const { id } = req.params;
  const userById = await User.findUserById(id);
  return res.status(STATUS_OK).json(userById);
};

module.exports = {
  addUser,
  findAllUsers,
  findUserById,
};
