const jwt = require('jsonwebtoken');
const { StatusCodes: HTTP } = require('http-status-codes');

const { Users } = require('../models');
const { userSchema } = require('./validation');

const generateError = require('../utils/generateError');

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createUser = async (user) => {
  try {
    const isInvalid = userSchema.validate(user, { abortEarly: false }).error;

    if (isInvalid) {
      throw generateError(isInvalid.details[0].message);
    }

    const isEmailUnique = await Users.findOne({ where: { email: user.email } });
    if (isEmailUnique) {
      throw generateError('User already registered', HTTP.CONFLICT);
    }

    const { dataValues: createdUser } = await Users.create(user);

    const token = jwt.sign(createdUser, process.env.JWT_SECRET, jwtConfig);

    return { status: HTTP.CREATED, result: { token } };
  } catch (err) {
    return err;
  }
};

module.exports = { createUser };
