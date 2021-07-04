const { StatusCodes } = require('http-status-codes');
const userService = require('../services/userService');

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAll();
    res.status(StatusCodes.OK).send(users);
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: 'erro ao solicitar requisição' });
  }
};
const addUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const findEmail = await userService.findByEmail(email);
  if (findEmail !== null) {
    return res.status(StatusCodes.CONFLICT).json({ message: 'User already registered' });
  }
  const newUser = await userService.add(displayName, email, password, image);
  return res.status(StatusCodes.CREATED).send(newUser);
};

module.exports = {
  getAllUsers,
  addUser,
};
