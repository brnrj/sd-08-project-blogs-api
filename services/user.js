const jwt = require('jsonwebtoken');
const { User } = require('../models/index.js');

const secret = 'seusecretdetoken';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};
const EIGHT = 8;
const SIX = 6;
// regex tirada do: https:/ / formik.org / docs / guides / validation;
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const isValidUser = (displayName, email) => {
  if (displayName && displayName.length < EIGHT) {
    return '"displayName" length must be at least 8 characters long';
  }

  if (!email) return '"email" is required';

  if (!regexEmail.test(email)) return '"email" must be a valid email';

  return undefined;
};

const isValidPassword = (password) => {
  if (password === undefined) return '"password" is required';

  if (typeof password !== 'string' || password.length === 0) {
    return '"password" is not allowed to be empty';
  }

  if (password.length < SIX)
    return '"password" length must be 6 characters long';

  return undefined;
};

const isValidEmail = (email) => {
  if (email === undefined) return '"email" is required';
  if (email.length === 0) return '"email" is not allowed to be empty';

  return undefined;
};

const validUser = async (displayName, email, password, image) => {
  const notUser = isValidUser(displayName, email);
  const notPassword = isValidPassword(password);

  if (notUser) throw new Error(notUser);

  if (notPassword) throw new Error(notPassword);

  const findUser = await User.findOne({ where: { email } });

  if (findUser) throw new Error('User already registered');

  await User.create({ displayName, email, password, image });

  const token = jwt.sign({ displayName, email, image }, secret, jwtConfig);
  return token; // obj com a chave token arrumar
};

const login = async (email, password) => {
  const isValidUserEmail = isValidEmail(email);
  const isValidUserPassword = isValidPassword(password);

  if (isValidUserEmail) throw new Error(isValidUserEmail);

  if (isValidUserPassword) throw new Error(isValidUserPassword);

  const findEmail = await User.findOne({ where: { email } });

  if (!findEmail) throw new Error('Invalid fields');

  const newToken = jwt.sign({ email, id: findEmail.id }, secret, jwtConfig);
  // console.log(newToken);

  return newToken;
};

const findAllUsers = async () => {
  const findUsers = await User.findAll();
  console.log(findUsers);
  return findUsers;
};

const findOneUserById = async (id) => {
  const oneUser = await User.findOne({ where: { id } });
  if (!oneUser) throw new Error('User does not exist');
  return oneUser;
};

const removeUserFromDatabase = async (email) => {
  await User.destroy({ where: { email } });
};

module.exports = {
  validUser,
  login,
  findAllUsers,
  findOneUserById,
  removeUserFromDatabase,
};
