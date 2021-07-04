const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};
// const { validDisplayName  } = require('../validations/validateDisplayName');
// const { validEmail } = require('../validations/validateEmail');
// const { validPassword } = require('../validations/validatePassword');

const getAll = async () => {
  const users = await User.findAll();
  return users;
};

const findByEmail = async (email) => {
  const searchEmail = await User.findOne({ where: { email } });
  return searchEmail;
};

const add = async (displayName, email, password, image) => {
  const addedUser = await User.create({ displayName, email, password, image });
  return addedUser;
};
const login = async (email, pass) => {
  const searchByEmail = await User.findOne({ where: { email } });

  if (searchByEmail !== null) {
    const { email: mail, password } = searchByEmail;
    if (password === pass) {
      const token = jwt.sign({ data: { mail, password } }, secret, jwtConfig);
      return token;
    }
  }
};
const findById = async (id) => {
    const searchEmail = await User.findOne({ where: { id } });
    return searchEmail;
  };
module.exports = {
  getAll,
  findByEmail,
  add,
  login,
  findById,
};
