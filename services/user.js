const { User } = require('../models');
const validations = require('../validations/user');

const createUser = async ({ displayName, email, password, _image }) => {
  validations.displayName(displayName);
  validations.emailVerify(email);
  validations.passwordVerify(password);

  const user = await User.findOne({ where: { email } });

  validations.userExists(user);

  return 'passou';
};

module.exports = {
  createUser,
};