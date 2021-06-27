const { User } = require('../models');
const { getToken } = require('../auth/validateJWT');

/* const { validateDisplayName, validateEmail,
   validatePassword } = require('../middlewares/usersValidation.js'); */

const findUserByEmail = async (email) => {
  const userByEmail = await User.findOne({ where: { email } });
  return userByEmail;
};

const createUser = async (displayName, email, password, image) => {
  /* validateDisplayName(displayName);
  validateEmail(email);
  validatePassword(password); */
  const { dataValues: { id } } = await User.create({ displayName, email, password, image });
  const token = await getToken({ email, id });
  return token;
};

module.exports = {
  findUserByEmail,
  createUser,
};
