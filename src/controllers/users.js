const userService = require('../services');
const { httpStatusCode } = require('../../constants');

const createUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  try {
    const createdUser = await userService.createUser(displayName, email, password, image);
    res.status(httpStatusCode.CREATED).send(createdUser);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createUser,
};
