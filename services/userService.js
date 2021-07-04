const { User } = require('../models');
// const { validDisplayName  } = require('../validations/validateDisplayName');
// const { validEmail } = require('../validations/validateEmail');
// const { validPassword } = require('../validations/validatePassword');

const getAll = async () => {
  const users = await User.findAll();
  return users;
};

const findByEmail = async (email) => {
  const searchEmail = await User.findOne({ where: { email } });
  return searchEmail;
};

const add = async (displayName, email, password, image) => {
  //   const data = { displayName, email, password, image };
  //   const valName = validDisplayName(data);
  //   const valEmail = validEmail(data);
  //   const valPass = validPassword(data);
  const addedUser = await User.create({ displayName, email, password, image });
  return addedUser;
  //   console.log(valPass);
  //   //   return returnInfo;
};

module.exports = {
  getAll,
  findByEmail,
  add,
};
