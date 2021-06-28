const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const helpers = require('../../helpers/helpers');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const secret = 'tokenSecret';

const {
  validUser,
  validLogin,
} = require('../validator');

const createServices = async (data) => {
  const { error } = validUser.validate(data);
  if (error) return { status: helpers.QOO, message: error.details[0].message };

  const { email } = data;
  const emailExists = await User.findOne({ where: { email } });
  if (emailExists) return { status: helpers.QON, message: 'User already registered' };

  const result = await User.create(data);
  return result;
};

const loginServices = async (data) => {
  const { error } = validLogin.validate(data);
  if (error) return { status: helpers.QOO, message: error.details[0].message };

  const { email } = data;
  const emailExists = await User.findOne({ where: { email } });
  if (emailExists) return { status: helpers.QON, message: 'User already registered' };
  
  const bool = true;
  const payload = {
    _id: emailExists.id,
    email: data.email,
    role: bool,
  };

  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

module.exports = {
  createServices,
  loginServices,
};
