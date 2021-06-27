const { User } = require('../models');
const CustomErr = require('../utils');
const { httpStatusCode } = require('../../constants');
const { tokenGenerete } = require('../auth');
const { loginValidatetions } = require('../validations');

const login = async (userInfos) => {
  loginValidatetions(userInfos);
  const { email } = userInfos;
  const alreadyRegistredUser = await User.findOne({ where: { email } });
  if (!alreadyRegistredUser) {
    throw new CustomErr(httpStatusCode.BAD_REQUEST, 'Invalid fields');
  }

  const token = tokenGenerete({ email });
  return token;
};

module.exports = login;
