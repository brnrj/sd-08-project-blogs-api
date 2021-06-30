const { CREATED, OK } = require('../../common/constants/statusCodes');
const { createUser, getAllUsers } = require('../services/userService');

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

module.exports = {
  createsUser,
  getsAllUsers,
};
