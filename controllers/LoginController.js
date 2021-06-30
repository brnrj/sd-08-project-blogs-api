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

module.exports = Login;