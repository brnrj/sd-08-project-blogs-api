require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const BAD_REQUEST = 400;
const OK_STATUS = 200;


const BAD_REQUEST = 400;
const EXISTS = 409;
const CREATED = 201;

const checkLoginEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(BAD_REQUEST).json({
      message: '"email" is not allowed to be empty',
    });
  }
  const re = /.+@[A-z]+[.]com/;
  const isValidEmail = re.test(email);
  if (!isValidEmail) {
    return res.status(BAD_REQUEST).json({
        message: '"email" must be a valid email',
      });
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(EXISTS).json({ message: 'User already registered' });
  }
  next();
};

const checkLoginPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(BAD_REQUEST).json({
      message: '"password" is not allowed to be empty',
    });
  }
  if (password.length < 6) {
    return res.status(BAD_REQUEST).json({
      message: '"password" length must be 6 characters long',
    });
  }
  next();
};

const Login = async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name, password });
  if (!user) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid Fields' });
  }
  const { displayName, email } = user;
  const token = jwt.sign({ displayName, email }, secret, jwtConfig);
  return res.status(OK_STATUS).json({ token });
};

module.exports = {
  checkLoginEmail,
  checkLoginPassword,
  Login};