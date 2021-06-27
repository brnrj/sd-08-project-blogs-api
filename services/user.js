const { User } = require('../models/index');
const generateToken = require('./token');

const OK = 200;
const CREATED = 201;
const CONFLICT = 409;
const USER_EXISTS = { message: 'User already registered' };

const post = async (req, res) => {
  const { email } = req.body;
  const userData = await User.findOne({ where: { email } });
  if (userData) return res.status(CONFLICT).json(USER_EXISTS);
  await User.create(req.body);
  const token = generateToken(email);
  res.status(CREATED).json({ token });
};

const getAll = async (req, res) => {
  const userList = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  res.status(OK).json(userList);
};

module.exports = {
  post,
  getAll,
};
