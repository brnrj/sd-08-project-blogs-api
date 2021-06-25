const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(data);

  return schema;
};

const findUser = async (emailUser) => {
  try {
    const user = await User.findOne({ where: { email: emailUser } });
    return user;
  } catch (error) {
    return error.message;
  }
};

const tokenLogin = (user) => {
  const jwtConfig = {
    expiresIn: '12h',
    algorithm: 'HS256',
  };

  return jwt.sign({ data: user }, secret, jwtConfig);
};

const loginService = async ({ email, password }) => {
  const { error } = validateLogin({ email, password });
  if (error) return { statusCode: 400, json: { message: error.details[0].message } };

  try {
    const user = await findUser(email);
    if (!user) return { statusCode: 400, json: { message: 'Invalid fields' } };
    const token = tokenLogin(user.dataValues);
    return { statusCode: 200, json: { token } };
  } catch (err) {
    console.log(err.message);
    return { statusCode: 500, json: { message: 'Algo deu errado' } };
  }
};

module.exports = {
  loginService,
  tokenLogin,
};
