const Joi = require('joi');

const { User } = require('../models');
const JWTgenerate = require('../middleware/JWT');
const {
  Code400,
  Code404,
  Code409,
  Code500,
} = require('../Error');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string(),
});

const reqValid = (userInfo) => {
  const { error } = userSchema.validate(userInfo);
  if (error) {
    throw new Code400(error.details[0].message);
  }
};

const addUser = async (userInfo) => {
  reqValid(userInfo);
  try {
    const newUser = await User.create(userInfo);
    const { password, ...userInfoToken } = newUser;
    const token = JWTgenerate(userInfoToken);
    return token;
  } catch (err) {
    throw new Code409('User already registered');
  }
};

const findAllUsers = async () => {
  try {
    const allUsers = await User.findAll();
    return allUsers;
  } catch (err) {
    throw new Code500('Internal server error');
  }
};

const findUserById = async (id) => {
  let userById;
  try {
    userById = await User.findByPk(id);
  } catch (err) {
    throw new Code500('Internal server error');
  }
  if (!userById) throw new Code404('User does not exist');
  return userById;
};

module.exports = {
  addUser,
  findAllUsers,
  findUserById,
};
