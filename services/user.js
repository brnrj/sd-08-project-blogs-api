const { User } = require('../models/index');
const generateToken = require('./token');

const CREATED = 201;
const CONFLICT = 409;
const USER_EXISTS = {
  message: 'User already registered',
};

const post = async (req, res) => {
  const { email } = req.body;
  const userData = await User.findOne({ where: { email } });
  if (userData) return res.status(CONFLICT).json(USER_EXISTS);
  await User.create(req.body);
  const token = generateToken(email);
  res.status(CREATED).json({ token });
};

module.exports = {
  post,
};
