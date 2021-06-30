const { CREATED } = require('../../common/constants/statusCodes');
const { createUser } = require('../services/userService');

const createsUser = async (req, res) => {
  const userInfos = req.body;
  
  const createdUser = await createUser(userInfos);
  
  const { error } = createdUser;
  if (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  res.status(CREATED).json(createdUser);
};

module.exports = {
  createsUser,
};
