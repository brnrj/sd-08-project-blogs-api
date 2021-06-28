require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const { validateUser } = require('./loginValidates');
const { ERR } = require('../config/messages');
const { jwtConfig } = require('../config/jwtConfig');

const logUser = async (data) => {
  validateUser(data);
  const result = await Users.findOne({ where: {
    email: data.email,
    password: data.password,
  } });
  if (result === null) throw Error(ERR.invalidFields);
  const token = jwt.sign(
    { email: data.email, password: data.password },
    process.env.JWT_SECRET,
    jwtConfig,
  );
  return { token };
};

module.exports = {
  logUser,
};
