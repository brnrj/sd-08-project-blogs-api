const jwt = require('jsonwebtoken');
const { User } = require('../models');
const UserValidation = require('../validations/userValidations');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const create = async (user) => {
  const { displayName, email, password, image } = user;
  UserValidation.validateNewUser(user);
  await UserValidation.validateEmailAlreadyExists(email);
  
  const createdUser = await User.create({ displayName, email, password, image });
  
  const { id } = createdUser;

  const token = jwt.sign({ id, email, displayName }, secret, jwtConfig);

  return { token };
};

const getAll = async () => User.findAll();

module.exports = {
  create,
  getAll,
};
