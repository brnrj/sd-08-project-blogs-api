const jwt = require('jsonwebtoken');
const { StatusCodes: HTTP } = require('http-status-codes');

const { Users } = require('../models');
const { userSchema, loginSchema, tokenValidation } = require('./validation');

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
    delete createdUser.password;

    const token = jwt.sign(createdUser, process.env.JWT_SECRET, jwtConfig);

    return { status: HTTP.CREATED, result: { token } };
  } catch (err) {
    return err;
  }
};

const login = async (loginData) => {
  try {
    const isInvalid = loginSchema.validate(loginData).error;

    if (isInvalid) {
      throw generateError(isInvalid.details[0].message);
    }

    const userData = await Users.findOne({ where: loginData });

    if (!userData) {
      throw generateError('Invalid fields');
    }

    const { dataValues } = userData;
    delete dataValues.password;

    const token = jwt.sign(dataValues, process.env.JWT_SECRET, jwtConfig);

    return { status: HTTP.OK, result: { token } };
  } catch (err) {
    return err;
  }
};

const getUsers = async (token, id) => {
  try {
    tokenValidation(token);
    let responseData;

    if (!id) {
      responseData = await Users.findAll();
    }

    return { status: HTTP.OK, result: responseData };
  } catch (err) {
    return err;
  }
};

module.exports = { createUser, login, getUsers };
