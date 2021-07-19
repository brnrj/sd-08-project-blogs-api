const Joi = require('joi');

const { User } = require('../models');
const JWTgenerate = require('../middleware/JWT');
const {
  ErrorCode400,
  ErrorCode404,
  ErrorCode409,
  ErrorCode500,
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
    const { message } = error.details[0];
    throw new ErrorCode400(message);
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
    throw new ErrorCode409('User already registered');
  }
};

/* { attributes: { exclude: ['some field'] } } encontrado aqui:
  https://github.com/sequelize/sequelize/issues/4074 */
const findAllUsers = async () => {
  try {
    const allUsers = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
    return allUsers;
  } catch (err) {
    throw new ErrorCode500('Internal server error');
  }
};

const findUserById = async (id) => {
  let userById;
  try {
    userById = await User.findByPk(id, {
      attributes: {
        exclude: ['password'],
      },
    });
  } catch (err) {
    throw new ErrorCode500('Internal server error');
  }
  if (!userById) throw new ErrorCode404('User does not exist');

  return userById;
};

module.exports = {
  addUser,
  findAllUsers,
  findUserById,
};
