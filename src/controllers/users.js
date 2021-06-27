const { userService } = require('../services');
const { httpStatusCode } = require('../../constants');
const CustomErr = require('../utils');

const createUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  try {
    const createdUser = await userService.createUser(displayName, email, password, image);
    res.status(httpStatusCode.CREATED).json({ token: createdUser });
  } catch (error) {
    return next(error);
  }
};

const GetAllUsers = async (req, res, next) => {
  try {
    const getUsers = await userService.GetAllUsers();
    if (!getUsers) throw new CustomErr(httpStatusCode.BAD_REQUEST, 'Nothing to show');
    return res.status(httpStatusCode.OK).send(getUsers);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createUser,
  GetAllUsers,
};
