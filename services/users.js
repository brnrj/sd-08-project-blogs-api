const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { NOT_FOUND } = require('../helpers/statusHttp');
const userData = require('./validations/users/userData');

const { JWT_SECRET } = process.env;

const createUser = async (displayName, email, password, image) => {
  try {
    const userDateValidate = await userData(displayName, email, password);
    if (userDateValidate.err) return userDateValidate;
    
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const user = { displayName, email, password, image };
    const token = jwt.sign({ data: user }, JWT_SECRET, jwtConfig);
    
    await User.create({ displayName, email, password, image });
    return { token };
  } catch (e) {
    return { message: 'Algo de errado aconteceu...' };
  }
};

const findAllUsers = async () => {
  try {
    const allUsers = await User.findAll();
    return allUsers;
  } catch (e) {
    return { message: 'erro verifique o console' };
  }
};

const findUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (user === null) {
      return { err:
        {
          status: NOT_FOUND,
          message: 'User does not exist',
        },
      };
    }

    return user;
  } catch (e) {
    return { message: 'Algo deu errado...' };
  }
};

module.exports = {
  createUser,
  findAllUsers,
  findUserById,
};
