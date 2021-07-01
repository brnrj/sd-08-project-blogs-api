const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv/config');
// const { getToken } = require('../auth/validateJWT');
const { status, message } = require('../schema/status');

const findUserByEmail = async (email) => {
  const userByEmail = await User.findOne({ where: { email } });
  return userByEmail;
};

const createUser = async (data) => {
  const createdUser = await User.create(data);
  const { email, id } = createdUser;
  const token = jwt.sign({ email, id }, process.env.JWT_SECRET);
  return { token };
};

const findAllUsers = async () => {
  const user = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  return user;
};

const findUserById = async (id) => {
  const findUser = await User.findOne({ where: { id } });
  if (!findUser) {
    return {
      isError: true,
      status: status.notFound,
      message: message.userNotExist,
    };
  }
  const userById = await User.findByPk(id);
  return userById;
};

module.exports = {
  findUserByEmail,
  createUser,
  findAllUsers,
  findUserById,
};
