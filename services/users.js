const Joi = require('joi');

const createJWT = require('./createJWT');
const { User } = require('../models');
const { Error400, Error409 } = require('../errors');

const createUserDataSchema = Joi.object({
  displayName: Joi.string().min(8),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string(),
});

const add = async (userData) => {
  const { error } = createUserDataSchema.validate(userData);
  if (error) {
    const { message } = error.details[0];
    throw new Error400(message);
  }

  try {
    const response = await User.create(userData);
    const token = createJWT(response);
    return token;
  } catch (_err) {
    throw new Error409('User already registered');
  }
};

module.exports = {
  add,
};
