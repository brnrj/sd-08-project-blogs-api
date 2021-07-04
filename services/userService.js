const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};
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
const login = async (email, pass) => {
  const searchByEmail = await User.findOne({ where: { email } });
  // const findEmailUser = await userModel.getByEmail(mail);
  // if ([!mail, !pass].includes(true)) {
  //   return undefined;
  // }
  //   return searchEmail;

  if (searchByEmail !== null) {
    const { email: mail, password } = searchByEmail;
    if (password === pass) {
      const token = jwt.sign({ data: { mail, password } }, secret, jwtConfig);
      return token;
    }
    // } else {
    //   return 'not';
  }
};

module.exports = {
  getAll,
  findByEmail,
  add,
  login,
};
