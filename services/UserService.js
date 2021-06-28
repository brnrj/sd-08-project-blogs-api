const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const loginService = require('./LoginService');

const secret = process.env.JWT_SECRET;

const validateUser = (data) => {
  const schema = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().length(6).required(),
    image: Joi.string(),
  }).validate(data);

  return schema;
};

const checkRegistered = async (emailUser) => {
  try {
    const findUser = await User.findOne({ where: { email: emailUser } });
    return findUser;
  } catch (error) {
    return error.message;
  }
};

const verifyToken = (token) => jwt.verify(token, secret, (error, decoded) => {
    if (error) return null;

    return decoded;
  });

const addUser = async ({ displayName, email, password, image }) => {
  const { error } = validateUser({ displayName, email, password, image });
  if (error) return { statusCode: 400, json: { message: error.details[0].message } };

  try {
    const findUser = await checkRegistered(email);
    if (findUser) return { statusCode: 409, json: { message: 'User already registered' } };
    const createUser = await User.create({ displayName, email, password, image });
    const login = loginService.tokenLogin(createUser.dataValues);
    return { statusCode: 201, json: { token: login } };
  } catch (err) {
    console.log(err.message);
    return { statusCode: 500, json: { message: 'Algo deu errado' } };
  }
};

const getAllUsers = async (token) => {
  if (!token) {
    return { statusCode: 401, json: { message: 'Token not found' } };
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return { statusCode: 401, json: { message: 'Expired or invalid token' } };
  }

  try {
    const getAllUser = await User.findAll();
    return { statusCode: 200, json: getAllUser };
  } catch (err) {
    console.log(err.message);
    return { statusCode: 500, json: { message: 'Algo deu errado' } };
  }
};

module.exports = {
  addUser,
  getAllUsers,
};
