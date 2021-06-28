const jwt = require('jsonwebtoken');

const error = require('./errorMessages');
const { User } = require('../models');

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const SECRET = process.env.JWT_SECRET;

const registerUser = async ({ displayName, email, password, image }) => {
  const emailExists = await User.findAll({ where: { email } });

  if (emailExists.length !== 0) {
    return error.userRegistered;
  }

  const newUser = await User.create({
    displayName,
    email,
    password,
    image,
  });

  const payload = { data: { email, id: newUser.id } };

  const token = jwt.sign(payload, SECRET, jwtConfig);
    return newUser && { token };
};

const listUsers = async () => {
  const users = await User.findAll();

  return users;
};

const existsToken = async () => error.tokenNotFound;

const testToken = async (auth) => jwt.verify(auth, SECRET);

module.exports = {
  registerUser,
  listUsers,
  existsToken,
  testToken,
};