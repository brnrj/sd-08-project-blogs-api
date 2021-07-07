const jwt = require('jsonwebtoken');
const models = require('../models');

const secret = 'secret';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const CREATE = 201;
const SUCCESS = 200;
const CONFLICT = 409;
const ERROR = 500;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const emailExist = await models.Users.findOne({ where: { email } });  
  if (emailExist) return res.status(CONFLICT).json({ message: 'User already registered' });

  try {
    await models.Users.create({ displayName, email, password, image });

    const token = jwt.sign({ data: [displayName, email, password, image] }, secret, jwtConfig);

    return res.status(CREATE).json({ token });
  } catch (error) {
    return res.status(ERROR).send();
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await models.Users.findOne({ where: { email } });
    if (!user) return res.status(BAD_REQUEST).json({ message: 'Invalid fields' });
    if (user.password !== password) {
      return res.status(BAD_REQUEST).json({ message: 'Invalid fields' });
    }
    const token = jwt.sign({ data: user }, secret, jwtConfig);
    return res.status(SUCCESS).json({ token });
  } catch (e) {
    return res.status(ERROR).json({ message: e.message });
  }
};

const getUsers = async (_req, res) => {
  try {
    const users = await models.Users
      .findAll({ attributes: ['id', 'displayName', 'email', 'image'] });
    return res.status(SUCCESS).json(users);
  } catch (err) {
    return res.status(ERROR).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await models.Users.findOne({ where: { id } });
    if (!user) return res.status(NOT_FOUND).json({ message: 'User does not exist' });
    return res.status(SUCCESS).json(user);
  } catch (err) {
    return res.status(ERROR).json({ message: err.message });
  }
};

module.exports = {
  createUser, 
  login,
  getUsers,
  getUserById,
};