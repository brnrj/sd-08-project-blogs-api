const { CREATED, OK } = require('../../common/constants/statusCodes');
const { createUser, getAllUsers, getUserById } = require('../services/userService');

const createsUser = async (req, res) => {
  const userInfos = req.body;
  
  const createdUser = await createUser(userInfos);
  
  const { error } = createdUser;
  if (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  res.status(CREATED).json(createdUser);
};

const getsAllUsers = async (_req, res) => {
  const allUsers = await getAllUsers();
  res.status(OK).json(allUsers);
};

const getsUserById = async (req, res) => {
  const { id } = req.params;
  const user = await getUserById(id);
  const { error } = user;
  if (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  return res.status(OK).json(user);
};

module.exports = {
  createsUser,
  getsAllUsers,
  getsUserById,
};
