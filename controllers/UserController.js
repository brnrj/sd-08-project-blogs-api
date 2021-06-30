require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const EXISTS = 409;
const CREATED = 201;
const OK_STATUS = 200;

const checkName = (req, res, next) => {
  const { displayName } = req.body;
  if (!displayName || displayName.length < 8) {
  return res
    .status(BAD_REQUEST).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  next();
};

const checkEmail = async (req, res, next) => {
  const { email } = req.body;
  if (email === '') {
    return res
    .status(BAD_REQUEST).json({ message: '"email" is not allowed to be empty' });
  }
  if (!email) return res.status(BAD_REQUEST).json({ message: '"email" is required' });
  const re = /.+@[A-z]+[.]com/;
  const isValidEmail = re.test(email);
  if (!isValidEmail) {
    return res.status(BAD_REQUEST).json({ message: '"email" must be a valid email' });
  }
  const userExists = await User.findOne({ where: { email } });
  console.log('userExists: ', userExists);
  if (userExists) return res.status(EXISTS).json({ message: 'User already registered' });
  next();
};

const checkPassword = (req, res, next) => {
  const { password } = req.body;
  if (password === '') {
    return res.status(BAD_REQUEST).json({ message: '"password" is not allowed to be empty' });
  }
  if (!password) return res.status(BAD_REQUEST).json({ message: '"password" is required' });
  if (password.length < 6) {
    return res.status(BAD_REQUEST).json({ message: '"password" length must be 6 characters long' });
  }
  next();
};

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  await User.create({ displayName, email, password, image });
  const token = jwt.sign({ data: { displayName, email, image } }, secret, jwtConfig);
  return res.status(CREATED).json({ token });
};

const checkToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || token === '') {
    return res.status(UNAUTHORIZED).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    console.log('decoded: ', decoded);
    const user = await User.findOne({ where: { email: decoded.data.email } });
    if (!user) {
      return res.status(UNAUTHORIZED).json({ message: 'Expired or invalid token' });
    }
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  return res.status(OK_STATUS).json(users);
};

module.exports = {
  checkName,
  checkEmail,
  checkPassword,
  createUser,
  checkToken,
  getAllUsers,
};
