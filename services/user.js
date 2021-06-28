require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { validateUser } = require('./userValidates');
const { ERR } = require('../config/messages');
const jwtConfig = require('../config/jwtConfig');

const createUser = async (data) => {
  validateUser(data);

  try {
    await User.create(data);
    const { email, password } = data;
    const token = jwt.sign(
      { email, password },
      process.env.JWT_SECRET,
      jwtConfig,
    );
    return token;
  } catch (e) {
    throw new Error(ERR.userRegistered);
  }
};

module.exports = {
  createUser,
};
