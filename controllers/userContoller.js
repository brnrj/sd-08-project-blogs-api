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
    return res
      .status(StatusCodes.CONFLICT)
      .json({ message: 'User already registered' });
  }
  const newUser = await userService.add(displayName, email, password, image);
  return res.status(StatusCodes.CREATED).send(newUser);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const userLogin = await userService.login(email, password);
  // console.log(findEmail);
  if (userLogin) {
    return res.status(StatusCodes.OK).json({ token: userLogin });
  }
  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: 'Invalid fields' });
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const findId = await userService.findById(id);
  if (findId !== null) {
    return res.status(StatusCodes.OK).json(findId);
  }
  return res
    .status(StatusCodes.NOT_FOUND)
    .json({ message: 'User does not exist' });
};

module.exports = {
  getAllUsers,
  addUser,
  loginUser,
  getUserById,
};
