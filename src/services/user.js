const { Users } = require('../models');
const CustomErr = require('../utils');
const { httpStatusCode } = require('../../constants');
const { tokenGenerete } = require('../auth');
const { userValidations } = require('../validations');

const createUser = async (displayName, email, password, image) => {
    userValidations.nameValidate(displayName);
    userValidations.mailValidate(email);
    userValidations.passValidate(password);
    const alreadyRegistredUser = await Users.findOne({ where: { email } });
    if (alreadyRegistredUser) {
      throw new CustomErr(httpStatusCode.CONFLICT, 'User already registered');
    }

    const { dataValues: { id } } = await Users.create({ displayName, email, password, image });
    const token = tokenGenerete({ email, id });
    return token;
};

const getAllUsers = async () => {
  const usersFound = await Users.findAll();
  return usersFound;
};

const getUserById = async (id) => {
  const userFound = await Users.findOne({ where: { id } });
  return userFound;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};
