const Joi = require('joi');

const { User } = require('../models');
const JWTgenerate = require('./JWT');
const { ErrorCode400, ErrorCode409 } = require('../Error');

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

module.exports = {
  addUser,
};
