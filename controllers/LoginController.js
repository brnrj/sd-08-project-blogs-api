require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const OK_STATUS = 200;
const BAD_REQUEST = 400;

const checkLoginEmail = async (req, res, next) => {
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
  next();
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  console.log('email: ', email, 'password: ', password);
  const user = await User.findOne({ where: { email } });
  console.log('user: ', user);
  if (!user || user.password !== password) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid fields' });
  }
  const token = jwt.sign({ email }, secret, jwtConfig);
  console.log('token: ', token);
  return res.status(OK_STATUS).json({ token });
};

module.exports = { checkLoginEmail, Login };