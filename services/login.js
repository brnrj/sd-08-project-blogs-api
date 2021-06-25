const validations = require('../validations/login');
const { User } = require('../models');
const getToken = require('../helper/getToken');

const login = async (user) => {
  const { email } = user;

  validations.loginVerify(user);

  const userExists = await User.findOne({ where: { email } });

  validations.userExists(userExists);

  const { password, ...bdUser } = userExists.dataValues;

  const token = getToken(bdUser);

  return { token };
};

module.exports = {
  login,
};