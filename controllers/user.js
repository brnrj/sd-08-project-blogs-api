const jwt = require('jsonwebtoken');
const models = require('../models');

const secret = 'secret';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const CREATE = 201;
const CONFLICT = 409;
const ERROR = 500;

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

module.exports = {
  createUser, 
};