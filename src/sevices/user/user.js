const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const helpers = require('../../helpers/helpers');
require('dotenv').config();

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

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
  await User.create(data);
  
  const payload = {
    email: data.email,
    role: true,
  };
  
  const token = jwt.sign(payload, process.env.JWT_SECRET, jwtConfig);
  return token;
};

const loginServices = async (data) => {
  const { error } = validLogin.validate(data);
  if (error) return { status: helpers.QOO, message: error.details[0].message };

  const { email } = data;
  const emailExists = await User.findOne({ where: { email } });
  if (emailExists === null) return { status: helpers.QOO, message: 'Invalid fields' };
  
  const payload = {
    _id: emailExists.id,
    email: data.email,
    role: true,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, jwtConfig);
  return token;
};

const findServices = async () => {
  const result = await User.findAll();
  return result;
};

const findIdServices = async (id) => {
  const result = await User.findOne({ where: { id } });
  if (result === null) return { status: helpers.QOQ, message: 'User does not exist' };
  return result;
};

module.exports = {
  createServices,
  loginServices,
  findServices,
  findIdServices,
};
